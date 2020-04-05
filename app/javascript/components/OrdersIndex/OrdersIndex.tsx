import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OrderIndexLine } from './components';
import { Order } from '../types';
import { FetchOrderResponse } from '../api-types';
import { convertToOrderStatus, convertOrderLineItem } from '../api-helper';

function OrdersIndex(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const url = "/api/v1/orders/index";

        fetch(url)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json() as Promise<FetchOrderResponse[]>;
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
                            createdAt: responseOrder.created_at,
                            orderLineItems: responseOrder.order_line_items.map(convertOrderLineItem),
                        }
                    })
                )
            })
    }, []);

    return (
        <ListGroup className="mt-4 mr-3 ml-3">
            <h3>Your Orders</h3>
            {orders.map((order: Order) => {
                const { id } = order;

                return (
                    // <Link key={id} to={"orders/" + id}>
                    <ListGroup.Item as={Link} key={id} action to={"orders/" + id} >
                        <OrderIndexLine order={order} />
                    </ListGroup.Item>
                    // </Link>
                );
            })}
        </ListGroup>
    );
}

export default OrdersIndex;