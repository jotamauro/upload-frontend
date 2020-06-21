import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Box from "./pages/Box";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/box/:id" component={Box} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
