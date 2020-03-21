import PropTypes from 'prop-types';
import {Button, Container, Col, Row} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class Groceries extends React.Component {

  render() {
    return (
      <div>
      <Container>
          <Row>
              <Col>Immediate test</Col>
              <Col>Another Column</Col>
              <Button>This is a button</Button>
          </Row>
      </Container>
      </div>
    );
  }
}
