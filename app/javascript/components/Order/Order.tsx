import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { UnconfirmedOrderPage, ConfirmedOrderPage } from './components'
import React from 'react';
import { OrderStatus, Order, OrderLineItem } from '../types';
import { FetchOrderResponse } from '../api-types';

interface OrderState {
    order: Order;
}

interface RouteParams {
    id: string;
}

interface OrderProps {
    items: OrderLineItem[];
}

type OrderPageProps = OrderProps & RouteComponentProps<RouteParams> & WithTranslation

class OrderPage extends React.Component<OrderPageProps, OrderState> {
    constructor(props: OrderPageProps) {
        super(props);

        this.state = {
            order: {
                status: OrderStatus.Unknown,
                id: "",
                createdAt: "",
                orderLineItems: [],
                deliveryNotes: "",
            }
        };
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
                        deliveryNotes: "",
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
        const { order } = this.state;

        switch (order.status) {
            case OrderStatus.Unconfirmed:
                return <UnconfirmedOrderPage
                    orderLineItems={order.orderLineItems}
                    onSubmit={this.confirmOrder}
                    orderId={order.id}
                />;
            case OrderStatus.Confirmed:
                return <ConfirmedOrderPage
                    orderLineItems={order.orderLineItems}
                    status={order.status} />;
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
