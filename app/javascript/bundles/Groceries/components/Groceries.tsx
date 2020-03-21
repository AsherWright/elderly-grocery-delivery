import PropTypes from 'prop-types';
import {Button, Container, Col, Row, Form, ListGroup} from 'react-bootstrap';
import {GroceryItem} from '../../components';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class Groceries extends React.Component {

  render() {
    return (
      <Container>
        <Row>
          <h1>What do you want to order?</h1>
        </Row>
        <Row>
              <Col><h2>Aisles</h2></Col>
              <Col xs={5}>
                <h2>Grocery List</h2>
                <Form.Group>
                    <Form.Control size="lg" type="text" placeholder="Search"/>
                </Form.Group>
                <Row>
                  <Col><h4>Item</h4></Col>
                  <Col><h4>Price</h4></Col>
                  <Col><h4>Quantity</h4></Col>
                </Row>
                <ListGroup>
                  <ListGroup.Item>
                    <GroceryItem
                        name="French Fries"
                        price_range="$1.00 to $2.00"
                      />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button>Add items to Basket</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col xs={5}><h2>Basket</h2></Col>
        </Row>
      </Container>
    );
  }
}
