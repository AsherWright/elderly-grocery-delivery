import React, { useEffect, useState } from 'react';

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
}

interface OrderResponse {
    id: string;
    status: string;
    delivery_notes: string;
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
                            deliveryNotes: responseOrder.delivery_notes
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