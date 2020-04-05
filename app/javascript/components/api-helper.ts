import { Address, Order, OrderLineItem, OrderStatus } from './types';
import { ApiAddress, ApiOrder, ApiOrderLineItem } from './api-types';

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

export function convertToOrderLineItem(response: ApiOrderLineItem): OrderLineItem {
    return {
        groceryItem: response.grocery_item,
        id: response.id,
        quantity: response.quantity
    }
}

export function convertToAddress(response: ApiAddress): Address {
    return {
        addressLine: response.address_line,
        city: response.city,
        country: response.country,
        name: response.name,
        postalCode: response.postal_code,
        province: response.province,
        unitNumber: response.unit_number || ""
    }
}

export function convertToOrder(response: ApiOrder): Order {
    return {
        id: response.id,
        status: convertToOrderStatus(response.status),
        deliveryNotes: response.delivery_notes,
        createdAt: new Date(response.created_at),
        orderLineItems: response.order_line_items.map(convertToOrderLineItem),
        destination: response.destination && convertToAddress(response.destination),
        email: response.email,
        phoneNumber: response.phone_number
    }
}