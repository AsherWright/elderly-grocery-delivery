import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Groceries, MasterNavbar, Order } from "../components";

const App = (): JSX.Element => (
    <>
        <MasterNavbar />
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/groceries" exact component={Groceries} />
                <Route path="/orders/:id" exact component={Order} />
            </Switch>
        </Router>
    </>
)

export default App;