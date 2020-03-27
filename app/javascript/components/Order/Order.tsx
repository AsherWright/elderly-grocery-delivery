import { RouteComponentProps } from 'react-router-dom';
import React from 'react';

interface OrderLineItem {
    id: string;
    quantity: number;
    groceryItem: GroceryItem;
}

interface GroceryItem {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface Order {
    id: string;
    createdAt: string;
    orderLineItems: OrderLineItem[];
}

interface OrderState {
    order: Order;
}

interface RouteParams {
    id: string;
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
    order_line_items: OrderLineItemResponse[];
}

class OrderPage extends React.Component<RouteComponentProps<RouteParams>, OrderState> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props)

        this.state = {
            order: {
                id: "",
                createdAt: "",
                orderLineItems: []
            },
        }
    }

    componentDidMount(): void {
        const url = "/api/v1/orders/show/" + this.props.match.params.id;

        fetch(url)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json() as Promise<FetchOrderResponse>;
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState(
                {
                    order: {
                        createdAt: response.created_at,
                        id: response.id,
                        orderLineItems: response.order_line_items.map((item) => {
                            return {
                                groceryItem: item.grocery_item,
                                id: item.id,
                                quantity: item.quantity
                            }
                        })
                    }
                }
            ))
            .catch(() => this.props.history.push("/"));
    }

    render(): JSX.Element {
        const { order } = this.state;
        return (
            <div>
                id: {order.id}
                created at: {order.createdAt}
                items: {this.getOrderItems()}
            </div>
        );
    }

    getOrderItems(): JSX.Element {
        return (<>
            {this.state.order.orderLineItems.map(this.viewOrderItem)}
        </>)
    }

    viewOrderItem(item: OrderLineItem): JSX.Element {
        return (
            <>
                <div>Item id: {item.id}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Grocery Item Name: {item.groceryItem.name}</div>
                <div>Grocery Item Price: {item.groceryItem.price}</div>
            </>
        )
    }
}

export default OrderPage;