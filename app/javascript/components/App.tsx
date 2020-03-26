import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Groceries from "./Groceries/components/Groceries";
import Order from "./Order/components/Order";

const App = (): JSX.Element => (
    <Router>
        <Switch>
            <Route path="/" exact component={Groceries} />
            <Route path="/orders/:id" exact component={Order} />
        </Switch>
    </Router>
)

export default App;