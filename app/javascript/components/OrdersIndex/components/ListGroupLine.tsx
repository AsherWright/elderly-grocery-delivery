import React from 'react';
import { Row, Col } from 'react-bootstrap';

type itemType = (JSX.Element | string);

interface ListGroupLineProps {
    items: [itemType, itemType, itemType, itemType];
}

function ListGroupLine(props: ListGroupLineProps): JSX.Element {
    const { items } = props;

    return (
        <Row>
            <Col xs={2} sm={2}>{items[0]}</Col>
            <Col xs={3} sm={3}>{items[1]}</Col>
            <Col>{items[2]}</Col>
            <Col>{items[3]}</Col>
        </Row>
    );
}

export default ListGroupLine