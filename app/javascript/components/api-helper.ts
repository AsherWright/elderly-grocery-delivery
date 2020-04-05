import { Address, OrderLineItem, OrderStatus } from './types';
import { ApiAddress, ApiOrderLineItem } from './api-types';

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