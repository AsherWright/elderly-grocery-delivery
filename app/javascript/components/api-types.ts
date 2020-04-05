interface FetchUserResponse {
    id: string;
    name: string;
    email: string;
}

interface GroceryItemResponse {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface OrderLineItemResponse {
    id: string;
    quantity: number;
    grocery_item: GroceryItemResponse;
}

interface FetchOrderResponse {
    id: string;
    created_at: string;
    status: string;
    order_line_items: OrderLineItemResponse[];
    delivery_notes: string;
}

interface FetchGroceryItemsResponse {
    id: string;
    name: string;
    price: number;
}

export {
    FetchGroceryItemsResponse,
    FetchOrderResponse,
    FetchUserResponse,
    GroceryItemResponse,
    OrderLineItemResponse
}