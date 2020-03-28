import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { OrderItemList, OrderDeliveryForm } from './'

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

interface UnconfirmedOrderPageProps {
    orderLineItems: OrderLineItem[];
    onSubmit: () => void;
}

function UnconfirmedOrderPage(props: UnconfirmedOrderPageProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12} md={6}>
                    <h3
                        className='text-center'
                    >
                        {t('order.order_summary')}
                    </h3>
                    <OrderItemList
                        OrderListItems={props.orderLineItems}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <h3
                        className='text-center'
                    >
                        {t('order.delivery_details')}
                    </h3>
                    <OrderDeliveryForm onSubmit={props.onSubmit} />
                </Col>
            </Row>
        </Container>
    );
}

export default UnconfirmedOrderPage;
