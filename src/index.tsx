import * as React from "react";
import { render } from "react-dom";

import { authServiceCtx } from "./auth/contexts";
import authService from "./services/auth";
import CurrentUserProvider from "./auth/components/CurrentUserProvider";
import Routes from "./Routes";

render(
  <authServiceCtx.Provider value={authService}>
    <CurrentUserProvider>
      <Routes />
    </CurrentUserProvider>
  </authServiceCtx.Provider>,
  document.getElementById("root")
);
