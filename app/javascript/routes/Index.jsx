import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Delivery from "../components/Delivery"
import Signup from "../components/Signup";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/delivery" exact component={Delivery} />
      <Route path="/signup" exact component={Signup} />
    </Switch>
  </Router>
);

