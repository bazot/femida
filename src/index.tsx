import * as React from "react";
import { render } from "react-dom";

import { authServiceCtx } from "./auth/contexts";
import authService from "./services/auth";
import GraphqlProvider from "./services/GraphqlProvider";
import AuthProvider from "./auth/components/AuthProvider";
import Routes from "./Routes";

render(
  <authServiceCtx.Provider value={authService}>
    <AuthProvider>
      <GraphqlProvider>
        <Routes />
      </GraphqlProvider>
    </AuthProvider>
  </authServiceCtx.Provider>,
  document.getElementById("root")
);
