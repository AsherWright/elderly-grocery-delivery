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

    const headers = <Row>
      <Col><h5>{t("basket.item")}</h5></Col>
      <Col><h5>{t("basket.price")}</h5></Col>
      <Col><h5>{t("basket.quantity")}</h5></Col>
      <Col></Col>
    </Row>

    const itemsList = this.props.items.map((item) =>
      <ListGroup.Item key={item.id}>
        <GroceryItem
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          inCart={true}
          handleButtonPressed={this.props.handleRemovedButtonPressed}
          handleQuantityChange={(val): void => this.props.handleQuantityChange(item.id, val)} />
      </ListGroup.Item>
    );

    return (
      <>
        {headers}
        <ListGroup>
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
              Total Price:
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