const enum OrderStatus {
    Unconfirmed,
    Confirmed,
    Assigned,
    BeingDelivered,
    Completed,
    Cancelled,
    Unknown
}

interface GroceryItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface OrderLineItem {
    id: string;
    quantity: number;
    groceryItem: GroceryItem;
}

interface Address {
    name: string;
    addressLine: string;
    unitNumber: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
}

interface Order {
    id: string;
    createdAt: Date;
    status: OrderStatus;
    deliveryNotes: string;
    phoneNumber: string;
    email: string;
    orderLineItems: OrderLineItem[];
    destination: Address | null;
}

export { Address, OrderStatus, Order, OrderLineItem, GroceryItem }