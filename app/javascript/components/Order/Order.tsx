import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { UnconfirmedOrderPage, ConfirmedOrderPage } from './components'
import React from 'react';
import { OrderStatus, Order, OrderLineItem } from '../types';
import { ApiOrder } from '../api-types';
import { convertToOrder } from '../api-helper';

interface OrderState {
    order: Order;
}

interface OrderProps {
    items: OrderLineItem[];
}

type OrderPageProps = OrderProps & RouteComponentProps<{ id: string }> & WithTranslation

class OrderPage extends React.Component<OrderPageProps, OrderState> {
    constructor(props: OrderPageProps) {
        super(props);

        this.state = {
            order: {
                status: OrderStatus.Unknown,
                id: "",
                createdAt: new Date(),
                orderLineItems: [],
                deliveryNotes: "",
                destination: { addressLine: "", city: "", country: "", name: "", postalCode: "", province: "", unitNumber: "" },
                email: "",
                phoneNumber: ""
            }
        };
        this.confirmOrder = this.confirmOrder.bind(this);
    }

    componentDidMount(): void {
        const url = "/api/v1/orders/show/" + this.props.match.params.id;

        fetch(url).then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<ApiOrder>;
            }
            throw new Error("Network response was not ok.");
        }).then(response => {
            this.setState(
                { order: convertToOrder(response) }
            )
        }).catch(() => this.props.history.push("/"));
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

    confirmOrder(): void {
        this.setState({
            order: { ...this.state.order, status: OrderStatus.Confirmed }
        })
    }
}

export default withTranslation()(OrderPage);
