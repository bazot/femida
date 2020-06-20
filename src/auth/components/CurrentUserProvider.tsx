import React, { useContext, useState, useEffect } from "react";
import { User } from "@firebase/auth-types";

import { authServiceCtx, currentUserCtx } from "../contexts";

export default (props: React.PropsWithChildren<any>) => {
  const firebase = useContext(authServiceCtx);
  const [user, setUser] = useState(firebase ? firebase.auth.currentUser : null);

  useEffect(() => {
    if (firebase) {
      firebase.auth.onAuthStateChanged((currentUser: User | null) => {
        setUser(currentUser || null);
      });
    }
  }, [firebase, setUser]);

  return (
    <currentUserCtx.Provider value={user}>
      {props.children}
    </currentUserCtx.Provider>
  );
};
