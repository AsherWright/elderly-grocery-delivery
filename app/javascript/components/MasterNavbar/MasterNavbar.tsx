import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Button, Form, Navbar, Nav } from 'react-bootstrap';

function handleLogOut(): void {
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
            return response.json();
        }
        throw new Error("Network response was not ok on user sign out.");
    })
}

function MasterNavbar(): JSX.Element {
    const { t } = useTranslation();

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">GoGetGroceries</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">{t('master_navbar.home')}</Nav.Link>
                <Nav.Link href="#order">{t('master_navbar.order')}</Nav.Link>
                <Nav.Link href="#deliver">{t('master_navbar.deliver')}</Nav.Link>
                <Nav.Link href="#about">{t('master_navbar.about')}</Nav.Link>
            </Nav>
            <Form inline>
                <Link to='/users'>
                    <Button className="mr-1">Log in</Button>
                </Link>
                <Button onClick={handleLogOut}>Log out</Button>
            </Form>
        </Navbar >
    );
}

export default MasterNavbar;