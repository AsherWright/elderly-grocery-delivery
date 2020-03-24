import React from 'react';
import {Button, Container, Col, Row, Form, ListGroup} from 'react-bootstrap';
import {GroceryItem} from '.'

interface BasketProps {

}

export default class Basket extends React.Component<BasketProps> {

  render() {

    return (
        <>
        <Row>
            <Col><h5>Item</h5></Col>
            <Col><h5>Price</h5></Col>
            <Col><h5>Quantity</h5></Col>
            <Col></Col>
        </Row>
        <ListGroup>
            <ListGroup.Item>
              <Button variant="outline-primary" block>Order your groceries now</Button>
            </ListGroup.Item>
        </ListGroup>
        </>
    );
  }
}
