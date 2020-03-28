import React from 'react';
import { Button, Col, Row, ListGroup } from 'react-bootstrap';
import { GroceryItem } from '.'
import { withTranslation, WithTranslation } from 'react-i18next';

interface BasketProps {
  items: GroceryListItem[];
  handleRemovedButtonPressed: (id: string) => void;
  handleQuantityChange: (id: string, val: number) => void;
  handleCreateOrder: () => void;
  totalCartPrice: number;
  maxQuantityPerItem: number;
}

interface GroceryListItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class Basket extends React.Component<BasketProps & WithTranslation> {
  render(): JSX.Element {
    const { t } = this.props;

    const headers = (
      <ListGroup.Item>
        <Row>
          <Col><h6>{t("basket.item")}</h6></Col>
          <Col><h6>{t("basket.price")}</h6></Col>
          <Col><h6>{t("basket.quantity")}</h6></Col>
          <Col></Col>
        </Row>
      </ListGroup.Item>
    );

    const itemsList = this.props.items.map((item) =>
      <ListGroup.Item key={item.id}>
        <GroceryItem
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          inCart={true}
          handleButtonPressed={this.props.handleRemovedButtonPressed}
          handleQuantityChange={(val): void => this.props.handleQuantityChange(item.id, val)}
          maxQuantity={this.props.maxQuantityPerItem}
        />
      </ListGroup.Item>
    );

    return (
      <>
        <ListGroup variant="flush">
          {headers}
          {itemsList}
          {this.getTotalPriceElement()}
          <ListGroup.Item>
            <Button
              variant="outline-primary"
              block
              onClick={this.props.handleCreateOrder}
            >
              {t("basket.order_now")}
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </>
    );
  }

  getTotalPriceElement(): JSX.Element | null {
    if (this.props.items.length == 0) {
      return null;
    } else {
      return (
        <ListGroup.Item className='font-weight-bold'>
          <Row>
            <Col>
              {this.props.t("basket.total_price")}
            </Col>
            <Col>
              ${this.props.totalCartPrice}
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </ListGroup.Item >
      );
    }
  }
}

export default withTranslation()(Basket);