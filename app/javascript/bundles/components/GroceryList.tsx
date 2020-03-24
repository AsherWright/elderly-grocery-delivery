import React from 'react';
import {Button, Container, Col, Row, Form, ListGroup, Modal} from 'react-bootstrap';
import {GroceryItem, NewItemModal} from '.'

interface GroceryListProps {
  items: GroceryListItem[]
}

interface GroceryListState {
  addItemModalShowing: boolean
}

interface GroceryListItem {
  name: string;
  price: string;
}

export default class GroceryList extends React.Component<GroceryListProps,GroceryListState> {

   showModal() {
     this.setState({
       addItemModalShowing: true
     })
   }

  hideModal() {
    this.setState({
      addItemModalShowing: false
    })
  }

  constructor(props:GroceryListProps) {
    super(props)

    this.state = {
      addItemModalShowing: false
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  render() {

    const headers = (
      <Row>
        <Col><h5>Item</h5></Col>
        <Col><h5>Price</h5></Col>
        <Col><h5>Quantity</h5></Col>
        <Col></Col>
      </Row>
    )

    const itemsList = this.props.items.map((item) =>
      <ListGroup.Item><GroceryItem name={item.name} price={item.price} inCart={false}/></ListGroup.Item>
    );

    return (
        <>
        {headers}
        <ListGroup>
          {itemsList}
        <ListGroup.Item>
          <p className = "text-center">Can't find what you're looking for? Click the button below to add a new item.</p>
            <Button variant="outline-primary" block onClick={this.showModal}> Add New Item</Button>
        </ListGroup.Item>
        </ListGroup>
        <NewItemModal
          isVisible = {this.state.addItemModalShowing}
          onAdd={() => {}}
          onClose={this.hideModal}
        />
        </>
    );
  }
}
