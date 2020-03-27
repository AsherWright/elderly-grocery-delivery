import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { withTranslation, WithTranslation } from 'react-i18next';
import { GroceryList, Basket } from './components';

const topPad = {
  paddingTop: 30
}

interface FetchGroceryItemsResponseElement {
  id: string;
  name: string;
  price: number;
}

interface CreateOrderResponse {
  id: string;
}

interface CreateLineItemsResponse {

}

interface GroceryItem {
  id: string;
  name: string;
  price: number;
}

interface GroceryLineItem extends GroceryItem {
  quantity: number;
}

interface GroceriesState {
  groceryItems: GroceryItem[];
  searchLineItems: GroceryLineItem[];
  cartLineItems: GroceryLineItem[];
}

type GroceriesProps = RouteComponentProps & WithTranslation;

class Groceries extends React.Component<GroceriesProps, GroceriesState> {
  constructor(props: GroceriesProps) {
    super(props)

    this.state = {
      groceryItems: [],
      searchLineItems: [],
      cartLineItems: []
    }

    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.handleListQuantityChange = this.handleListQuantityChange.bind(this);
    this.handleCartQuantityChange = this.handleCartQuantityChange.bind(this);
    this.modifyItemInList = this.modifyItemInList.bind(this);
    this.handleCreateOrder = this.handleCreateOrder.bind(this);
    this.addNewItemToBasket = this.addNewItemToBasket.bind(this);
    this.getTotalCartPrice = this.getTotalCartPrice.bind(this);
  }

  componentDidMount(): void {
    const url = "/api/v1/grocery_items/index";
    fetch(url)
      .then((response: Response) => {
        if (response.ok) {
          return response.json() as Promise<FetchGroceryItemsResponseElement[]>;
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState(
        { groceryItems: response.map(groceryListItem => ({ ...groceryListItem, quantity: 1 })) }
      ))
      .catch(() => this.props.history.push("/"));
  }

  handleSearch(text: string): void {
    const regex = new RegExp(text, "i");
    const matchingGroceryItems = text === "" ? [] : this.state.groceryItems.filter(x => regex.test(x.name))

    const searchLineItems = matchingGroceryItems.map((item) => {
      return {
        ...item,
        quantity: 1
      }
    });

    this.setState({ searchLineItems })
  }

  handleCreateOrder(): void {
    const lineItemsUrl = "/api/v1/order_line_items/create";
    const ordersUrl = "/api/v1/orders/create";
    const { cartLineItems } = this.state;

    if (cartLineItems.length == 0)
      return;

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    const fetchParams = (body: string) => {
      return {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body
      }
    }

    fetch(ordersUrl, fetchParams(""))
      .then((response: Response) => {
        if (response.ok) {
          return response.json() as Promise<CreateOrderResponse>;
        }
        throw new Error("Network response was not ok on order create.");
      })
      .then((createOrderResponse: CreateOrderResponse) => {
        const lineItemsBody =
        {
          items: cartLineItems.map((item) => {
            return {
              quantity: item.quantity,
              order_id: createOrderResponse.id,
              grocery_item_id: item.id
            }
          })
        };
        fetch(lineItemsUrl, fetchParams(JSON.stringify(lineItemsBody)))
          .then((response: Response) => {
            if (response.ok) {
              this.props.history.push('/orders/' + createOrderResponse.id)
              return;
            }
            throw new Error("Network response was not ok on line items create.")
          })
      })
      .catch((error: Error) => console.log(error.message));
  }

  render(): JSX.Element {
    const { t } = this.props;

    return (
      <>
        <Container fluid>
          <Row className="justify-content-md-center" style={topPad}>
            <Col>
              <Form.Group>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder={t('groceries.search')}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void => this.handleSearch(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col><h3 className="text-center">{t('groceries.basket')}</h3></Col>
          </Row>
          <Row>
            <Col>
              <GroceryList
                items={this.state.searchLineItems}
                handleAddButtonPressed={this.addItemToCart}
                handleQuantityChange={this.handleListQuantityChange}
                onAddNewItem={this.addNewItemToBasket}
              />
            </Col>
            <Col>
              <Basket
                items={this.state.cartLineItems}
                handleRemovedButtonPressed={this.removeItemFromCart}
                handleQuantityChange={this.handleCartQuantityChange}
                handleCreateOrder={this.handleCreateOrder}
                totalCartPrice={this.getTotalCartPrice(this.state.cartLineItems)}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  removeItemFromCart(id: string): void {
    this.setState({
      cartLineItems: this.state.cartLineItems.filter(item => item.id !== id)
    })
  }

  addItemToCart(id: string): void {
    const searchItem = this.state.searchLineItems.find((item) => item.id === id) as GroceryLineItem
    const correspondingCartItem = this.state.cartLineItems.find((item) => item.id === id)

    if (correspondingCartItem) {
      const quantity = searchItem.quantity + correspondingCartItem.quantity
      this.setState({
        cartLineItems: this.modifyItemInList(this.state.cartLineItems, id, { quantity })
      })
    } else {
      this.setState({
        cartLineItems: [...this.state.cartLineItems, searchItem]
      })
    }
  }

  handleListQuantityChange(id: string, quantity: number): void {
    this.setState({
      searchLineItems: this.modifyItemInList(this.state.searchLineItems, id, { quantity })
    })
  }

  handleCartQuantityChange(id: string, quantity: number): void {
    this.setState({
      cartLineItems: this.modifyItemInList(this.state.cartLineItems, id, { quantity })
    })
  }

  modifyItemInList(itemList: GroceryLineItem[], id: string, properties: Partial<GroceryLineItem>): GroceryLineItem[] {
    const groceryItem = itemList.find((item) => item.id === id) as GroceryLineItem

    return itemList.map((item) => item.id == id ? { ...groceryItem, ...properties } : item)
  }

  addNewItemToBasket(itemName: string, itemPrice: string): void {
    const newItem: GroceryLineItem = { name: itemName, price: Number(itemPrice), quantity: 1, id: itemName }
    const itemAlreadyExists: boolean = this.state.cartLineItems.some((item) => item.name === itemName)

    if (!itemAlreadyExists) {
      this.setState({
        cartLineItems: [...this.state.cartLineItems, newItem]
      })
    }
  }

  getTotalCartPrice(cartLineItems: GroceryLineItem[]): number {
    return cartLineItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

export default withTranslation()(Groceries);