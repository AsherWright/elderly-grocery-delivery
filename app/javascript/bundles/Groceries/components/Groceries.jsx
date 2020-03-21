import PropTypes from 'prop-types';
import {Button, Container, Col, Row, Form} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class Groceries extends React.Component {

  render() {
    return (
      <Container>
        <Row>
          <h1>What do you want to order?</h1>
        </Row>
        <Row>
              <Col><h2>Ailes</h2></Col>
              <Col>
                <h2>Display</h2>
                <Form.Group>
                    <Form.Control size="lg" type="text" placeholder="Search" />
                </Form.Group>
              </Col>
              <Col><h2>Basket</h2></Col>
        </Row>
      </Container>
    );
  }
}
