import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { OrderStatus } from '../../types';

interface OrderIndexLineProps {
    order: Order;
}

function getStatusBadge(status: OrderStatus): JSX.Element {
    switch (status) {
        case OrderStatus.Unconfirmed:
            return <Badge pill variant="secondary">Draft</Badge>;
        case OrderStatus.Confirmed:
            return <Badge pill variant="primary">Confirmed</Badge>;
        default:
            return <Badge pill variant="danger">Error</Badge>;
    }
}

function OrderIndexLine(props: OrderIndexLineProps): JSX.Element {
    return (
        <Row>
            <Col xs={1}>{props.order.id}</Col>
            <Col>{getStatusBadge(props.order.status)}</Col>
            <Col>{props.order.deliveryNotes}</Col>
        </Row>
    );
}

export default OrderIndexLine