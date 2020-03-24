import {RouteComponentProps} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, Container, Col, Row, Form, ListGroup, Jumbotron, Navbar, Nav, FormControl} from 'react-bootstrap';
import {GroceryItem, GroceryList, Basket} from '../../components';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const topPad = {
  paddingTop: 30
}

interface GroceriesProps extends RouteComponentProps {

}

interface GroceryListItem {
  name: string;
  price: number;
}

interface GroceriesState {
  itemsInList: GroceryListItem[];
  itemsInCart: GroceryListItem[];
}

export default class Groceries extends React.Component<GroceriesProps, GroceriesState> {

  constructor(props:GroceriesProps) {
    super(props)
    this.state = {
      itemsInList: [],
      itemsInCart: []
    }
  }

  componentDidMount() {
    const url = "/api/v1/grocery_items/index";
    fetch(url)
      .then((response: Response) => {
        console.log(response)
        if (response.ok) {
          return response.json() as Promise<GroceryListItem[]>;
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ itemsInList: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    return (
      <>
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">GoGetGroceries</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#order">Order</Nav.Link>
              <Nav.Link href="#deliver">Deliver</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
        </Navbar>
        <Container fluid>
          <Row className="justify-content-md-center" style = {topPad}>
                <Col>
                <Form.Group>
                  <Form.Control size="lg" type="text" placeholder="Search for the groceries you need"/>
                </Form.Group>
                </Col>
                <Col><h3 className="text-center">Basket</h3></Col>
          </Row>
          <Row>
            <Col><GroceryList items={this.state.itemsInList}/></Col>
            <Col><Basket/></Col>   
          </Row>
        </Container>
      </>
    );
  }
}
