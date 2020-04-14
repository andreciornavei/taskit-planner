import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Panel from "./pages/Panel";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Panel} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
