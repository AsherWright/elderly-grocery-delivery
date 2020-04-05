import React from 'react';
import { OrderStatusBadge } from '../../components';
import { Order, OrderStatus, OrderLineItem } from '../../types';
import { ListGroupLine } from '.';

interface OrderSummaryLineProps {
    order: Order;
}

function getSummary(items: OrderLineItem[]): string {
    const summary = items.map((item) => item.groceryItem.name).join(", ");

    // TODO: Change this to use overflow: ellipsis properly
    if (summary.length > 35)
        return summary.substr(0, 32) + "...";

    return summary;
}

function getDate(date: Date): string {
    return date.toDateString()
}

function getOrderStatusBadge(status: OrderStatus): JSX.Element {
    return <OrderStatusBadge status={status} />
}

function OrderSummaryLine(props: OrderSummaryLineProps): JSX.Element {
    const { status, deliveryNotes, createdAt, orderLineItems } = props.order;

    return (
        <ListGroupLine
            items={
                [
                    getDate(createdAt),
                    getOrderStatusBadge(status),
                    getSummary(orderLineItems),
                    deliveryNotes
                ]
            }
        />
    );
}

export default OrderSummaryLine