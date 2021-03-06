import React from 'react';
import { Button, Col, Row, Modal, InputGroup, FormControl } from 'react-bootstrap';

interface NewItemModalProps {
  isVisible: boolean;
  onAdd: (itemName: string, itemPrice: string) => void;
  onClose: () => void;
}

interface NewItemModalState {
  itemName: string;
  itemPrice: string;
}

export default class NewItemModal extends React.Component<NewItemModalProps, NewItemModalState> {

  constructor(props: NewItemModalProps) {
    super(props)

    this.state = {
      itemName: '',
      itemPrice: ''
    }

    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleItemPriceChange = this.handleItemPriceChange.bind(this);
    this.priceFormatted = this.priceFormatted.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);

  }

  render(): JSX.Element {

    return (

      <Modal
        show={this.props.isVisible}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.onClose}
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
                  value={this.state.itemName}
                  onChange={this.handleItemNameChange}
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
                  value={this.state.itemPrice}
                  onChange={this.handleItemPriceChange}
                />
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.handleAddClick}
            variant='primary'
            disabled={this.state.itemName == '' || this.state.itemPrice == ''}
          >
            Add item
          </Button>
          <Button onClick={this.props.onClose} variant='secondary'>Close</Button>
        </Modal.Footer>
      </Modal>

    );
  }

  handleItemNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ itemName: event.target.value })
  }

  handleItemPriceChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const itemPrice = event.target.value

    if (this.priceFormatted(itemPrice)) {
      this.setState({ itemPrice })
    }
  }

  priceFormatted(input: string): boolean {
    const num = Number(input)
    return (!isNaN(num))
  }

  handleAddClick(): void {
    this.props.onAdd(this.state.itemName, this.state.itemPrice)
    this.setState({
      itemName: '',
      itemPrice: ''
    })
    this.props.onClose()
  }
}
