import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";

import App from "./App";
import SignIn from "./auth/components/SignIn";
import SignUp from "./auth/components/SignUp";
import SignOut from "./auth/components/SignOut";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <Redirect to="/app" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
