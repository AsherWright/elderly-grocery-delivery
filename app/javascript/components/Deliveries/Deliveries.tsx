import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import { ApiOrder } from '../api-types';
import { convertToAddress, convertToOrderStatus, convertToOrderLineItem } from '../api-helper';

function Deliveries(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const url = "/api/v1/orders/index/?status=confirmed";

        fetch(url)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json() as Promise<ApiOrder[]>;
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
                            orderLineItems: responseOrder.order_line_items.map(convertToOrderLineItem),
                            createdAt: new Date(responseOrder.created_at),
                            destination: convertToAddress(responseOrder.destination),
                            email: responseOrder.email,
                            phoneNumber: responseOrder.phone_number
                        }
                    })
                )
            })
    }, []);

    return (
        <>
            {orders.map((order) => {
                return (
                    <>
                        <div>id = {order.id}, status = {order.status}, delivery notes = {order.deliveryNotes}</div>
                    </>
                );
            })}
        </>
    );
}

export default Deliveries;