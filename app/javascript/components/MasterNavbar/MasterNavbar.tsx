import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Navbar, Nav } from 'react-bootstrap';
import { TFunction } from 'i18next';

function MasterNavbar(): JSX.Element {
    const { t, i18n } = useTranslation();

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
                <Button className="mr-1" onClick={(): Promise<TFunction> => i18n.changeLanguage('en')}>English</Button>
                <Button onClick={(): Promise<TFunction> => i18n.changeLanguage('fr')}>Français</Button>
            </Form>
        </Navbar >
    );
}

export default MasterNavbar;