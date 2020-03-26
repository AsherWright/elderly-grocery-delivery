import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav } from 'react-bootstrap';

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
        </Navbar>
    );
}

export default MasterNavbar;