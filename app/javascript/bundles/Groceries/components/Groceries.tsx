import PropTypes from 'prop-types';
import {Button, Card, Container, Col, Row, Form, ListGroup, Jumbotron, Navbar, Nav, FormControl} from 'react-bootstrap';
import {GroceryItem, GroceryList, Basket} from '../../components';
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
            <Col><GroceryList/></Col>
            <Col><Basket/></Col>   
          </Row>
        </Container>
      </>
    );
  }
}
