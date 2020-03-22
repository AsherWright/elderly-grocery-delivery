import React from 'react';
import {Button, Container, Col, Row, Form} from 'react-bootstrap';

interface GroceryItemProps {
  name: string;
  price_range: string;
}

export default class GroceryItem extends React.Component<GroceryItemProps> {

  render() {
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
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}
