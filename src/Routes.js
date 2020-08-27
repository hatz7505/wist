import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        {/* if route not found redirect to homepage */}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
