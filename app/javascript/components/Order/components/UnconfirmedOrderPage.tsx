import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { OrderItemList, OrderDeliveryForm } from './';
import { OrderLineItem } from '../../types';

interface UnconfirmedOrderPageProps {
    orderLineItems: OrderLineItem[];
    orderId: string;
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
                    <OrderDeliveryForm onSubmit={props.onSubmit} orderId={props.orderId} />
                </Col>
            </Row>
        </Container>
    );
}

export default UnconfirmedOrderPage;
