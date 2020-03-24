import React from 'react';
import {Button, Container, Col, Row, Form, ListGroup, Modal} from 'react-bootstrap';
import {GroceryItem, NewItemModal} from '.'

interface GroceryListProps {

}

interface GroceryListState {
  AddItemModalShowing: boolean
}

export default class GroceryList extends React.Component<GroceryListProps,GroceryListState> {

   showModal() {
     this.setState({
       AddItemModalShowing: true
     })
   }

  hideModal() {
    this.setState({
      AddItemModalShowing: false
    })
  }

  constructor(props:GroceryListProps) {
    super(props)

    this.state = {
      AddItemModalShowing: false
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

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
            <GroceryItem
                name="French Fries"
                price="$2.00"
                in_cart={false}
              />
          </ListGroup.Item>
          <ListGroup.Item>
            <GroceryItem
                name="White Tooter Liz"
                price="$800.00"
                in_cart={false}
              />
          </ListGroup.Item>
          <ListGroup.Item>
          <p className = "text-center">Can't find what you're looking for? Click the button below to add a new item.</p>
            <Button variant="outline-primary" block onClick={this.showModal}> Add New Item</Button>
        </ListGroup.Item>
        </ListGroup>
        <NewItemModal
          isVisible = {this.state.AddItemModalShowing}
          onAdd={() => {}}
          onClose={this.hideModal}
        />
        </>
    );
  }
}
