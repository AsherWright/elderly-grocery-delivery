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

interface Order {
    id: string;
    status: OrderStatus;
    deliveryNotes: string;
    createdAt: string;
    orderLineItems: OrderLineItem[];
}

export { OrderStatus, Order, OrderLineItem, GroceryItem }