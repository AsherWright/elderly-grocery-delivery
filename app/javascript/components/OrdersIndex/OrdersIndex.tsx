import React, { useEffect, useState } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import { OrderSummaryLine, ListGroupLine } from './components';
import { Order } from '../types';
import { ApiOrder } from '../api-types';
import { convertToOrder } from '../api-helper';

function getTitleBar(t: TFunction): JSX.Element {
    return (
        <Row>
            <Col xs={6}>{<h3>{t("order_index.your_orders")}</h3>}</Col>
            <Col xs={6}>
                <Link to="/groceries">
                    <Button className="float-right">{t("order_index.create_order")}</Button>
                </Link>
            </Col>
        </Row>
    );
}

function getHeaders(t: TFunction): JSX.Element {
    return (
        <ListGroup.Item style={{ fontWeight: "bold" }}>
            <ListGroupLine
                items={[
                    t("order_index.date_created"),
                    t("order_index.status"),
                    t("order_index.grocery_items"),
                    t("order_index.notes")
                ]}
            />
        </ListGroup.Item>
    );
}

function OrdersIndex(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const url = "/api/v1/orders/index";

        fetch(url).then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<ApiOrder[]>;
            }
            throw new Error("Network response was not ok.");
        }).then(response => setOrders(response.map(convertToOrder)))
    }, []);

    const titleBar = getTitleBar(t);
    const headers = getHeaders(t);

    return (
        <ListGroup className="mt-4 mr-3 ml-3" variant="flush">
            {titleBar}
            {headers}
            {orders.map((order: Order) => {
                const { id } = order;

                return (
                    <ListGroup.Item as={Link} key={id} action to={"orders/" + id}>
                        <OrderSummaryLine order={order} />
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}

export default OrdersIndex;