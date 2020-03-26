import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Groceries from "./Groceries/components/Groceries";
import Order from "./Order/components/Order";
import Home from './Home/components/Home';

const App = (): JSX.Element => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/groceries" exact component={Groceries} />
            <Route path="/orders/:id" exact component={Order} />
        </Switch>
    </Router>
)

export default App;