import React, { useEffect, useState } from 'react';
import {DeliveryLine} from "./components"
import { ListGroup, Col, Row } from 'react-bootstrap';

enum OrderStatus {
    Unconfirmed,
    Confirmed,
    Assigned,
    BeingDelivered,
    Completed,
    Cancelled,
    Unknown
}

interface Order {
    id: string;
    status: OrderStatus;
    deliveryNotes: string;
    name: string;
    postalCode: string;
}

interface OrderResponse {
    id: string;
    status: string;
    delivery_notes: string;
    user: { name: string };
    destination: { postal_code: string };
}

function convertToOrderStatus(status: string): OrderStatus {
    switch (status) {
        case "unconfirmed":
            return OrderStatus.Unconfirmed;
        case "confirmed":
            return OrderStatus.Confirmed;
        case "assigned":
            return OrderStatus.Assigned;
        case "being_delivered":
            return OrderStatus.BeingDelivered;
        case "completed":
            return OrderStatus.Completed;
        case "cancelled":
            return OrderStatus.Cancelled;
        default:
            return OrderStatus.Unknown;
    }
}

function Deliveries(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const url = "/api/v1/orders/index/";

        fetch(url)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json() as Promise<OrderResponse[]>;
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                console.log(response)
                setOrders(
                    response.map((responseOrder) => {
                        return {
                            id: responseOrder.id,
                            status: convertToOrderStatus(responseOrder.status),
                            deliveryNotes: responseOrder.delivery_notes,
                            name: responseOrder.user.name,
                            postalCode: responseOrder.destination.postal_code
                        }
                    })
                )
            })
    }, []);

    return (
        <>
            <ListGroup variant="flush" className="ml-3 mr-3 mt-4">
                <h3> Orders </h3>
                <ListGroup.Item>
                    <Row style={{fontWeight: "bold"}}> 
                        <Col xs={1}>ID</Col>
                        <Col>Status</Col>
                        <Col>Name</Col>
                        <Col>Amount</Col>
                        <Col>Postal Code</Col>
                    </Row>
                </ListGroup.Item>
                {orders.map((order) => {
                    return (
                        <ListGroup.Item>
                            <DeliveryLine
                                id={order.id}
                                name={order.name}
                                status={order.status}
                                amount={92}
                                postalCode={order.postalCode} />
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </>
    );
}

export default Deliveries;