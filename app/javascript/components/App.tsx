import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Deliveries, Home, Groceries, LanguageSelector, MasterNavbar, Order, Users } from "../components";
import { UserProvider } from './UserContext';

const App = (): JSX.Element => {
    const [state, setState] = useState('');

    const updateUser = (user: string): void => {
        setState(user)
    }

    const userContext = { user: state, setUser: updateUser }

    return <>
        <UserProvider value={userContext}>
            <Router>
                <MasterNavbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/groceries" exact component={Groceries} />
                    <Route path="/orders/:id" exact component={Order} />
                    <Route path="/deliveries" exact component={Deliveries} />
                    <Route path="/users" exact component={Users} />
                </Switch>
            </Router>
            <LanguageSelector />
        </UserProvider>
    </>
}

export default App;