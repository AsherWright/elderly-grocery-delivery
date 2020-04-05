import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Deliveries, Home, Groceries, LanguageSelector, MasterNavbar, Order, OrdersIndex, Users } from "../components";
import { UserProvider } from './UserContext';
import { ApiUser } from './api-types';

const App = (): JSX.Element => {
    const [state, setState] = useState('');

    useEffect(() => {
        const url = "/api/v1/users/show";

        fetch(url).then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<ApiUser | null>;
            }
            throw new Error("Network response not okay on fetching user.")
        }).then(response => {
            if (response != null) {
                setState(response.name)
            }
        }).catch()
    }, []);

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
                    <Route path="/orders" exact component={OrdersIndex} />
                    <Route path="/deliveries" exact component={Deliveries} />
                    <Route path="/users" exact component={Users} />
                </Switch>
            </Router>
            <LanguageSelector />
        </UserProvider>
    </>
}

export default App;