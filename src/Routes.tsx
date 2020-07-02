import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";

import App from "./App";
import SignIn from "./auth/components/SignIn";
import SignUp from "./auth/components/SignUp";
import SignOut from "./auth/components/SignOut";
import Story from "./components/Story";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <Route path="/stories/:id" component={Story} />
        <Redirect to="/app" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
