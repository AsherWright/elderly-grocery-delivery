import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface OrderItemProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

function OrderItem(props: OrderItemProps): JSX.Element {
    return (
        <Row>
            <Col xs={4} md={5} lg={4} style={{ wordBreak: "break-all" }}>{props.name}</Col>
            <Col xs={4} md={3} lg={4}>{props.quantity}</Col>
            <Col xs={4} md={4} lg={4}>${props.price * props.quantity}</Col>
        </Row>
    );
}

export default OrderItem;