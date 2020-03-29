import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { UnconfirmedOrderPage, ConfirmedOrderPage } from './components'
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
    status: OrderStatus;
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
    status: string;
    order_line_items: OrderLineItemResponse[];
}

interface OrderProps {
    items: OrderLineItem[];
}

enum OrderStatus {
    Unconfirmed,
    Confirmed,
    Assigned,
    BeingDelivered,
    Completed,
    Cancelled,
    Unknown
}

type OrderPageProps = OrderProps & RouteComponentProps<RouteParams> & WithTranslation

class OrderPage extends React.Component<OrderPageProps, OrderState> {
    constructor(props: OrderPageProps) {
        super(props);

        this.state = { order: { status: OrderStatus.Unknown, id: "", createdAt: "", orderLineItems: [] } };
        this.confirmOrder = this.confirmOrder.bind(this);
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
                        status: this.convertToOrderStatus(response.status),
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
        return this.getOrderPage();
    }

    getOrderPage(): JSX.Element {
        const { order: { status, orderLineItems } } = this.state;

        switch (status) {
            case OrderStatus.Unconfirmed:
                return <UnconfirmedOrderPage
                    orderLineItems={orderLineItems}
                    onSubmit={this.confirmOrder}
                />;
            case OrderStatus.Confirmed:
                return <ConfirmedOrderPage
                    orderLineItems={orderLineItems}
                    status={status} />;
            default:
                return <></>;
        }
    }

    convertToOrderStatus(status: string): OrderStatus {
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

    confirmOrder(): void {
        this.setState({
            order: { ...this.state.order, status: OrderStatus.Confirmed }
        })
    }
}

export default withTranslation()(OrderPage);
