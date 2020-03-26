import { RouteComponentProps } from 'react-router-dom';
import React from 'react';

interface FetchOrderResponse {
    id: string;
    created_at: string;
}

interface Order {
    id: string;
    createdAt: string;
}

interface OrderState {
    order: Order;
}

class OrderPage extends React.Component<RouteComponentProps, OrderState> {
    constructor(props: RouteComponentProps) {
        super(props)

        this.state = {
            order: {
                id: "",
                createdAt: ""
            },
        }
    }

    componentDidMount(): void {
        const orderIdMatches = window.location.pathname.match(/orders\/(.*)$/)
        const orderId = orderIdMatches && orderIdMatches[1]

        const url = "/api/v1/orders/show/" + orderId;
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
                        id: response.id
                    }
                }
            ))
            .catch(() => this.props.history.push("/"));
    }

    render(): JSX.Element {
        return (
            <div>
                <h3>
                    Hi: {this.state.order.id}
                </h3>
                <h3>
                    Hi: {this.state.order.createdAt}
                </h3>
            </div>
        );
    }
}

export default OrderPage;