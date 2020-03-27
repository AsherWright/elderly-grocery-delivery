import React from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { withTranslation, WithTranslation } from 'react-i18next';

interface GroceryItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  inCart: boolean;
  handleButtonPressed: (itemId: string) => void;
  handleQuantityChange: (val: number) => void;
}

class GroceryItem extends React.Component<GroceryItemProps & WithTranslation> {
  getButtonVariant(): "outline-danger" | "outline-success" {
    if (this.props.inCart) {
      return "outline-danger"
    } else {
      return "outline-success"
    }
  }

  getButtonText(): string {
    const { t } = this.props;

    return this.props.inCart ? t('grocery_item.remove') : t('grocery_item.add')
  }

  render(): JSX.Element {
    const button = (
      <Button
        variant={this.getButtonVariant()}
        block
        onClick={(): void => this.props.handleButtonPressed(this.props.id)}
      >
        {this.getButtonText()}
      </Button>
    );

    return (
      <Row>
        <Col>
          {this.props.name}
        </Col>
        <Col>
          ${this.props.price}
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              size='sm'
              onChange={
                (event: React.ChangeEvent<HTMLInputElement>): void => this.props.handleQuantityChange(Number(event.target.value))
              }
              value={String(this.props.quantity)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          {button}
        </Col>
      </Row >
    );
  }
}

export default withTranslation()(GroceryItem)