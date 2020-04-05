import { Row, Col, ListGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import React from 'react';
import { OrderItem } from '.';
import { OrderLineItem } from '../../types';

interface OrderItemListProps {
    OrderListItems: OrderLineItem[];
}

function getTotalPrice(itemsList: OrderLineItem[]): number {
    return itemsList.reduce((total, item) => total + item.groceryItem.price * item.quantity, 0);
}

function getTotalPriceElement(itemsList: OrderLineItem[], totalText: string): JSX.Element | null {
    if (itemsList.length == 0) {
        return null
    } else {
        return (
            <ListGroup.Item>
                <Row>
                    <Col xs={4} md={5} lg={4}></Col>
                    <Col xs={4} md={3} lg={4} className="font-weight-bold">{totalText}</Col>
                    <Col xs={4} md={4} lg={4}>${getTotalPrice(itemsList)}</Col>
                </Row>
            </ListGroup.Item>
        )
    }
}

function OrderItemList(props: OrderItemListProps): JSX.Element {
    const { t } = useTranslation();

    const headers = (
        <Row>
            <Col xs={4} md={6} lg={4}><h5>{t('order_item_list.item')}</h5></Col>
            <Col xs={4} md={3} lg={4}><h5>{t('order_item_list.quantity')}</h5></Col>
            <Col xs={4} md={3} lg={4}><h5>{t('order_item_list.price')}</h5></Col>
        </Row>
    )

    const itemsList = props.OrderListItems.map((item) =>
        <ListGroup.Item key={item.id}>
            <OrderItem
                id={item.id}
                name={item.groceryItem.name}
                price={item.groceryItem.price}
                quantity={item.quantity}
            />
        </ListGroup.Item>
    );

    return (
        <>
            <Row>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{headers}</ListGroup.Item>
                        {itemsList}
                        {getTotalPriceElement(props.OrderListItems, t('order_item_list.total_price'))}
                    </ListGroup>
                </Col>
            </Row>

        </>
    )
}

export default OrderItemList;
