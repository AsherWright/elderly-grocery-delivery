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

interface RouteParams {
    id: string;
}

class OrderPage extends React.Component<RouteComponentProps<RouteParams>, OrderState> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props)

        this.state = {
            order: {
                id: "",
                createdAt: ""
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