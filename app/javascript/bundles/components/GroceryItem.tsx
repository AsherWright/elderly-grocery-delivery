import React from 'react';
import {Button, Container, Col, Row, Form} from 'react-bootstrap';

interface GroceryItemProps {
  id: string;
  name: string;
  price: number;
  inCart: boolean;
  handleButtonPressed: (item_id: string) => void;
}

export default class GroceryItem extends React.Component<GroceryItemProps> {
  getButtonVariant(){
    if (this.props.inCart) {
      return "outline-danger"
    } else {
      return "outline-success"
    }
  }

  getButtonText(){
    if (this.props.inCart) {
      return "Remove"
    } else {
      return "Add"
    }
  }

  render() {
    const button = (
      <Button
        variant={this.getButtonVariant()}
        block
        onClick={() => this.props.handleButtonPressed(this.props.id)}
      >
          {this.getButtonText()}
      </Button>
    );

    return (
      <Row>
        <Col>
          {this.props.name}
        </Col>
        <Col>
          {this.props.price}
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
