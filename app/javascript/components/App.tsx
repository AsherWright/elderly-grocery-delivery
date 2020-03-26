import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Groceries from "./Groceries/components/Groceries";

const App = (): JSX.Element => (
    <Router>
        <Switch>
            <Route path="/" exact component={Groceries} />
        </Switch>
    </Router>
)

export default App;