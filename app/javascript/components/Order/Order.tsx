import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap'
import { withTranslation, WithTranslation } from 'react-i18next';
import { OrderItemList } from './components'
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

interface OrderProps {
    items: OrderLineItem[];
}

type OrderPageProps = OrderProps & RouteComponentProps<RouteParams> & WithTranslation

class OrderPage extends React.Component<OrderPageProps, OrderState> {
    constructor(props: OrderPageProps) {
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
        const { t } = this.props
        const { order } = this.state;

        return (
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <OrderItemList
                            OrderListItems={this.state.order.orderLineItems}
                        />
                    </Col>
                    <Col xs={12} md={6}>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withTranslation()(OrderPage);