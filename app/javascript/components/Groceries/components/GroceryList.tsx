import React from 'react';
import { Button, Col, Row, ListGroup } from 'react-bootstrap';
import { GroceryItem, NewItemModal } from '.'
import { withTranslation, WithTranslation } from 'react-i18next';

interface GroceryListProps {
  items: GroceryListItem[];
  handleAddButtonPressed: (id: string) => void;
  handleQuantityChange: (id: string, val: number) => void;
  onAddNewItem: (itemName: string, itemPrice: string) => void;
  maxQuantityPerItem: number;
}

interface GroceryListState {
  addItemModalShowing: boolean;
}

interface GroceryListItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type GroceryListPropsWithI18n = GroceryListProps & WithTranslation;

class GroceryList extends React.Component<GroceryListPropsWithI18n, GroceryListState> {

  showModal(): void {
    this.setState({
      addItemModalShowing: true
    })
  }

  hideModal(): void {
    this.setState({
      addItemModalShowing: false
    })
  }

  constructor(props: GroceryListPropsWithI18n) {
    super(props)

    this.state = {
      addItemModalShowing: false
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  render(): JSX.Element {
    const {
      t,
      items,
      onAddNewItem,
      handleAddButtonPressed,
      handleQuantityChange
    } = this.props

    const headers = (
      <ListGroup.Item>
        <Row>
          <Col><h6>{t('grocery_list.item')}</h6></Col>
          <Col><h6>{t('grocery_list.price')}</h6></Col>
          <Col><h6>{t('grocery_list.quantity')}</h6></Col>
          <Col></Col>
        </Row>
      </ListGroup.Item>
    );

    const itemsList = items.map((item) =>
      <ListGroup.Item key={item.id}>
        <GroceryItem
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          inCart={false}
          handleButtonPressed={handleAddButtonPressed}
          handleQuantityChange={(val): void => handleQuantityChange(item.id, val)}
          maxQuantity={this.props.maxQuantityPerItem}
        />
      </ListGroup.Item>
    );

    return (
      <>
        <ListGroup variant="flush">
          {headers}
          {itemsList}
          <ListGroup.Item>
            <p className="text-center">{t('grocery_list.search_prompt')}</p>
            <Button variant="outline-primary" block onClick={this.showModal}>{t('grocery_list.add_new_item')}</Button>
          </ListGroup.Item>
        </ListGroup>
        <NewItemModal
          isVisible={this.state.addItemModalShowing}
          onAdd={onAddNewItem}
          onClose={this.hideModal}
        />
      </>
    );
  }
}

export default withTranslation()(GroceryList)