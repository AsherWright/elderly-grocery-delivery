import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Deliveries, Home, Groceries, MasterNavbar, Order, Users } from "../components";

const App = (): JSX.Element => (
    <>
        <MasterNavbar />
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/groceries" exact component={Groceries} />
                <Route path="/orders/:id" exact component={Order} />
                <Route path="/deliveries" exact component={Deliveries} />
                <Route path="/users" exact component={Users} />
            </Switch>
        </Router>
    </>
)

export default App;