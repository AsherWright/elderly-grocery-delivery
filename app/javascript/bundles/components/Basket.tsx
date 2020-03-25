import React from 'react';
import { Button, Col, Row, ListGroup } from 'react-bootstrap';
import { GroceryItem } from '.'

interface BasketProps {
  items: GroceryListItem[];
  handleRemovedButtonPressed: (id: string) => void;
  handleQuantityChange: (id: string, inCart: boolean, val: number) => void;
}

interface GroceryListItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class Basket extends React.Component<BasketProps> {

  render(): JSX.Element {

    const headers = <Row>
      <Col><h5>Item</h5></Col>
      <Col><h5>Price</h5></Col>
      <Col><h5>Quantity</h5></Col>
      <Col></Col>
    </Row>

    const itemsList = this.props.items.map((item) =>
      <ListGroup.Item key={item.id}>
        <GroceryItem
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          inCart={true}
          handleButtonPressed={this.props.handleRemovedButtonPressed}
          handleQuantityChange={(val): void => this.props.handleQuantityChange(item.id, false, val)} />
      </ListGroup.Item>
    );

    return (
      <>
        {headers}
        <ListGroup>
          {itemsList}
          <ListGroup.Item>
            <Button variant="outline-primary" block>Order your groceries now</Button>
          </ListGroup.Item>
        </ListGroup>
      </>
    );
  }
}
