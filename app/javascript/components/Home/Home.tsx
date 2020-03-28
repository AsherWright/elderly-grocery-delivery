import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { CardDeck, Col, Container, Row, Image } from 'react-bootstrap';
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
        "/",
        t('home.deliver_explanation'),
        t('home.deliver_header'),
        true
    );
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
        </Container>
    );
}

export default Home;