import PropTypes from 'prop-types';
import {Button, Card, Container, Col, Row, Form, ListGroup, Jumbotron, Navbar, Nav, FormControl} from 'react-bootstrap';
import {GroceryItem} from '../../components';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const topPad = {
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
          <Row className="justify-content-md-center" style = {topPad}>
                <Col>
                <Form.Group>
                  <Form.Control size="lg" type="text" placeholder="Search for the groceries you need"/>
                </Form.Group>
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
                          price_range="$1.00 to $2.00"
                          in_cart={false}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <GroceryItem
                          name="White Tooter Liz"
                          price_range="$400 to $800"
                          in_cart={false}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <p className = "text-center">Can't find what you're looking for? Click the button below to add a new item.</p>
                      <Button variant="outline-primary" block> Add New Item</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col><h3 className="text-center">Basket</h3>
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
                            price_range="$1.00 to $2.00"
                            in_cart
                          />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <GroceryItem
                            name="White Tooter Liz"
                            price_range="$400 to $800"
                            in_cart
                          />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button variant="outline-primary" block>Order your groceries now</Button>
                      </ListGroup.Item>
                    </ListGroup>
                </Col>
          </Row>
        </Container>
      </>
    );
  }
}
