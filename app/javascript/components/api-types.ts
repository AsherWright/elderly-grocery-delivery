interface ApiUser {
    id: string;
    name: string;
    email: string;
}

interface ApiGroceryItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface ApiOrderLineItem {
    id: string;
    quantity: number;
    grocery_item: ApiGroceryItem;
}

interface ApiAddress {
    name: string;
    address_line: string;
    unit_number: string | null;
    city: string;
    province: string;
    country: string;
    postal_code: string;
}

interface ApiOrder {
    id: string;
    created_at: string;
    status: string;
    delivery_notes: string;
    phone_number: string;
    email: string;
    order_line_items: ApiOrderLineItem[];
    destination: ApiAddress | null;
}

export {
    ApiAddress,
    ApiGroceryItem,
    ApiOrder,
    ApiUser,
    ApiOrderLineItem
}