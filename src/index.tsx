import * as React from "react";
import { render } from "react-dom";

import { authServiceCtx } from "./auth/contexts";
import AuthService from "./auth/AuthService";
import CurrentUserProvider from "./auth/components/CurrentUserProvider";
import Routes from "./Routes";

render(
  <authServiceCtx.Provider value={new AuthService()}>
    <CurrentUserProvider>
      <Routes />
    </CurrentUserProvider>
  </authServiceCtx.Provider>,
  document.getElementById("root")
);
