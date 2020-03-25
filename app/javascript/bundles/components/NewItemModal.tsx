import React from 'react';
import {Button, Container, Col, Row, Form, ListGroup, Modal, InputGroup, FormControl} from 'react-bootstrap';
import {GroceryItem, GroceryList} from '.'

interface NewItemModalProps {
    isVisible: boolean;
    onAdd: () => void;
    onClose: () => void;
}

export default class NewItemModal extends React.Component<NewItemModalProps> {

  render() {

    return (

    <Modal
      show={this.props.isVisible}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide = {this.props.onClose}
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding a new item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col>
            <h5>What is the item called?</h5>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="e.g. Bananas"
                    aria-label="name"
                    aria-describedby="inputGroup-sizing-default"
                  />
            </InputGroup>
            </Col>
        </Row>
        <Row>
            <Col>
            <h5>How much are you willing to pay for it?</h5>
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="e.g. 3.00"
                    aria-label="price"
                    />
            </InputGroup>
            </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onAdd} variant='primary'>Add item</Button>
            <Button onClick={this.props.onClose} variant='secondary'>Close</Button>
        </Modal.Footer>
    </Modal>

    );
  }
}
