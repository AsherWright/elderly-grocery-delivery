import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Button, Form, Navbar, Nav } from 'react-bootstrap';
import { TFunction } from 'i18next';
import { UserContext } from '../UserContext';

function handleLogOut(setUser: (user: string) => void): void {
    const logOutUrl = "/users/sign_out";
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

    const params = {
        method: "DELETE",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
    }

    fetch(logOutUrl, params).then((response: Response) => {
        if (response.ok) {
            window.location.reload();
            setUser("");
            return response.json();
        }
        throw new Error("Network response was not ok on user sign out.");
    })
}

function getUserButton(userContext: { user: string; setUser: (user: string) => void }, t: TFunction): JSX.Element {
    if (userContext.user === "") {
        return (
            <Link to='/users'>
                <Button>{t('shared.log_in')}</Button>
            </Link>
        );
    } else {
        return <Button variant="danger" onClick={(): void => handleLogOut(userContext.setUser)}>{t('shared.log_out')} {userContext.user}</Button>
    }
}

function MasterNavbar(): JSX.Element {
    const userContext = useContext(UserContext);
    const { t } = useTranslation();

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand as={Link} to="/">GoGetGroceries</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">{t('master_navbar.home')}</Nav.Link>
                <Nav.Link as={Link} to="/orders">{t('master_navbar.orders')}</Nav.Link>
                <Nav.Link as={Link} to="/deliver">{t('master_navbar.deliver')}</Nav.Link>
                <Nav.Link as={Link} to="/about">{t('master_navbar.about')}</Nav.Link>
            </Nav>
            <Form inline>
                {getUserButton(userContext, t)}
            </Form>
        </Navbar >
    );
}

export default MasterNavbar;