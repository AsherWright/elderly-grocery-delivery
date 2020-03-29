import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { OrderItemList } from '.'
import { useTranslation } from 'react-i18next';


interface OrderLineItem {
    id: string;
    quantity: number;
    groceryItem: GroceryItem;
}

interface GroceryItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

enum OrderStatus {
    Unconfirmed,
    Confirmed,
    Assigned,
    BeingDelivered,
    Completed,
    Cancelled,
    Unknown
}

interface ConfirmedOrderPageProps {
    orderLineItems: OrderLineItem[];
    status: OrderStatus;
}

function getAlert(status: OrderStatus): JSX.Element {
    const { t } = useTranslation();

    switch (status) {
        case OrderStatus.Confirmed:
            return (
                <Alert variant="primary">
                    <h5>{t('order_alert.confirmed_heading')}</h5>
                    <p>{t('order_alert.confirmed_body')}</p>
                </Alert>
            );
        case OrderStatus.Assigned:
            return (
                <Alert variant="info">
                    <h5>{t('order_alert.assigned_heading')}</h5>
                    <p>{t('order_alert.assigned_body')}</p>
                </Alert>);
        case OrderStatus.BeingDelivered:
            return (
                <Alert variant="primary">
                    <h5>{t('order_alert.being_delivered_heading')}</h5>
                    <p>{t('order_alert.being_delivered_body')}</p>
                </Alert>);
        case OrderStatus.Completed:
            return (
                <Alert variant="success">
                    <h5>{t('order_alert.completed_heading')}</h5>
                    <p>{t('order_alert.completed_body')}</p>
                </Alert>);
        case OrderStatus.Cancelled:
            return (
                <Alert variant="danger">
                    <h5>{t('order_alert.cancelled_heading')}</h5>
                    <p>{t('order_alert.cancelled_body')}</p>
                </Alert>);
        case OrderStatus.Unknown:
            return (
                <Alert variant="warning">
                    <h5>{t('order_alert.unknown_heading')}</h5>
                    <p>{t('order_alert.unknown_body')}</p>
                </Alert>);
        default:
            return (
                <Alert variant="dark">
                    <h5>{t('order_alert.default_heading')}</h5>
                    <p>{t('order_alert.default_body')}</p>
                </Alert>);
    }
}


function ConfirmedOrderPage(props: ConfirmedOrderPageProps): JSX.Element {

    const { t } = useTranslation();

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h3 className="text-center">{t("order.thank_you")}</h3>
                    <br />
                    {getAlert(props.status)}
                </Col>
                <Col>
                    <h3 className="text-center">{t("order.order_summary")}</h3>
                    <OrderItemList
                        OrderListItems={props.orderLineItems}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default ConfirmedOrderPage;
