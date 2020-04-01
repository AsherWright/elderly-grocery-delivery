import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Button, CardDeck, Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LongLogo from '../../../assets/images/long_logo.png';
import { HomeCard } from './components';

function getHomeCard(
    buttonText: string,
    linkPath: string,
    text: string,
    header: string,
    disabled: boolean,
): JSX.Element {
    return (
        <HomeCard
            buttonText={buttonText}
            buttonLinkPath={linkPath}
            cardText={text}
            disabled={disabled}
            header={header}
        />
    );
}

function getOrderGroceriesCard(t: TFunction): JSX.Element {
    return getHomeCard(
        t('home.order_groceries'),
        "/groceries",
        t('home.order_explanation'),
        t('home.order_header'),
        false
    );
}

function getViewOrderCard(t: TFunction): JSX.Element {
    return getHomeCard(
        t('home.view_order'),
        "/",
        t('home.view_order_explanation'),
        t('home.view_order_header'),
        true
    );
}

function getDeliverCard(t: TFunction): JSX.Element {
    return getHomeCard(
        t('home.deliver'),
        "/deliveries",
        t('home.deliver_explanation'),
        t('home.deliver_header'),
        false
    );
}

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

function Home(): JSX.Element {
    const { t } = useTranslation();

    return (
        <Container>
            <Image src={LongLogo} fluid />
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                    <CardDeck>
                        {getOrderGroceriesCard(t)}
                        {getViewOrderCard(t)}
                        {getDeliverCard(t)}
                    </CardDeck>
                </Col>
            </Row>
            <Link to='/users'>
                Log in
            </Link>
            <Button onClick={handleLogOut}>Log out</Button>
        </Container>
    );
}

export default Home;