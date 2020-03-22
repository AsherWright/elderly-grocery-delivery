import PropTypes from 'prop-types';
import {Button, Card, Container, Col, Row, Form, ListGroup, Jumbotron, Navbar, Nav, FormControl} from 'react-bootstrap';
import {GroceryItem} from '../../components';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const topRowStyle = {
  paddingTop: 30
}

export default class Groceries extends React.Component {

  render() {
    return (
      <>
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary">Search</Button>
            </Form>
        </Navbar>
        <Container fluid>
          <Row className="justify-content-md-center" style = {topRowStyle}>
                <Col><h3 className="text-center">Aisles</h3></Col>
                <Col>
                  <h3 className="text-center">Grocery List</h3>
                  <Form.Group>
                      <Form.Control size="lg" type="text" placeholder="Search"/>
                  </Form.Group>
                  <Row>
                    <Col><h5>Item</h5></Col>
                    <Col><h5>Price</h5></Col>
                    <Col><h5>Quantity</h5></Col>
                  </Row>
                  <ListGroup>
                    <ListGroup.Item>
                      <GroceryItem
                          name="French Fries"
                          price_range="$1.00 to $2.00"
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <GroceryItem
                          name="White Tooter Liz"
                          price_range="$400 to $800"
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button variant="outline-success" block>Add items to Basket</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col><h3 className="text-center">Basket</h3></Col>
          </Row>
        </Container>
      </>
    );
  }
}
