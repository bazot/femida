import React, { useState, useEffect } from "react";
import { User } from "@firebase/auth-types";

import firebase, { database, auth } from "../../services/firebase";
import { authCtx } from "../contexts";

export default (props: React.PropsWithChildren<any>) => {
  const [authState, setAuthState] = useState<{
    user?: User;
    status: "in" | "out";
    token?: string;
  }>({ status: "out" });

  useEffect(() => {
    auth.onAuthStateChanged(async (user: User | null) => {
      console.log("currentUser:", user);
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        console.log("token:", token);
        console.log("idTokenResult:", idTokenResult);
        console.log("hasuraClaim:", hasuraClaim);
        if (hasuraClaim) {
          setAuthState({ status: "in", user: user, token });
        } else if (firebase.database) {
          // Check if refresh is required.
          const metadataRef = database.ref(
            "metadata/" + user.uid + "/refreshTime"
          );
          console.log("metadataRef", metadataRef);

          metadataRef.on("value", async data => {
            console.log("on metadata value:", data);
            if (!data.exists) {
              return;
            }
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user: user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, [setAuthState]);

  return (
    <authCtx.Provider value={authState}>{props.children}</authCtx.Provider>
  );
};
