import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import { ApiOrder } from '../api-types';
import { convertToOrder } from '../api-helper';

function Deliveries(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const url = "/api/v1/orders/index/?status=confirmed";

        fetch(url).then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<ApiOrder[]>;
            }
            throw new Error("Network response was not ok.");
        }).then(response => setOrders(response.map(convertToOrder)))
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