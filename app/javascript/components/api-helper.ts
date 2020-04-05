import { OrderStatus, OrderLineItem } from './types';
import { OrderLineItemResponse } from './api-types';

export function convertToOrderStatus(status: string): OrderStatus {
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

export function convertOrderLineItem(response: OrderLineItemResponse): OrderLineItem {
    return {
        groceryItem: response.grocery_item,
        id: response.id,
        quantity: response.quantity
    }
}