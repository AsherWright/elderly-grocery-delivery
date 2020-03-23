import React from 'react';
import {Button, Container, Col, Row, Form} from 'react-bootstrap';

interface GroceryItemProps {
  name: string;
  price_range: string;
  in_cart: boolean;
}

export default class GroceryItem extends React.Component<GroceryItemProps> {

  render() {
    const add_button = <Button variant="outline-success" block>Add</Button>;
    const remove_button = <Button variant="outline-danger" block>Remove All</Button>;

    const button = this.props.in_cart ? remove_button : add_button;

    return (
      <Row>
        <Col>
          {this.props.name}
        </Col>
        <Col>
          {this.props.price_range}
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          {button}
        </Col>
      </Row>
    );
  }
}
