import React from 'react';
import {Button, Container, Col, Row, Form, ListGroup, Modal} from 'react-bootstrap';
import {GroceryItem} from '.'

interface NewItemModalProps {
    isVisible: boolean;
    onAdd: () => void;
    onClose: () => void;
}

export default class NewItemModal extends React.Component<NewItemModalProps> {

  render() {

    return (

    <Modal
      hidden={!this.props.isVisible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding a new item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>
          Enter the information below to add a new item to your grocery list. 
        </p>
        <Form.Group>
                  <Form.Control size="lg" type="text" placeholder="Search for the groceries you need"/>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Row>
                <Col><Button onClick={this.props.onClose}>Close</Button></Col>
                <Col><Button onClick={this.props.onAdd}>Add item</Button></Col>
            </Row>
        </Modal.Footer>
    </Modal>

    );
  }
}
