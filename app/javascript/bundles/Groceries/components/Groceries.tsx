import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Row, Form, Navbar, Nav } from 'react-bootstrap';
import { GroceryList, Basket, GroceryItem } from '../../components';
import uuid from 'uuid';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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

export default class Groceries extends React.Component<RouteComponentProps, GroceriesState> {

  constructor(props: RouteComponentProps) {
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

    const lineItemsBody =
    {
      items: cartLineItems.map((item) => {
        return {
          name: item.name,
          price: item.price
        }
      })
    };

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

    console.log(fetchParams(JSON.stringify(lineItemsBody)))

    fetch(ordersUrl, fetchParams(""))
      .then((response: Response) => {
        if (response.ok) {
          return response.json() as Promise<CreateOrderResponse>;
        }
        throw new Error("Network response was not ok on order create.");
      })
      .then((createOrderResponse: CreateOrderResponse) => {
        fetch(lineItemsUrl, fetchParams(JSON.stringify(lineItemsBody)))
          .then((response: Response) => {
            if (response.ok) {
              return response.json() as Promise<CreateLineItemsResponse>;
            }
            throw new Error("Network response was not ok on line items create.")
          })
      })
      .then(() => this.props.history.push("/"))
      .catch((error: Error) => console.log(error.message));
  }

  render(): JSX.Element {
    return (
      <>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">GoGetGroceries</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#order">Order</Nav.Link>
            <Nav.Link href="#deliver">Deliver</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
        </Navbar>
        <Container fluid>
          <Row className="justify-content-md-center" style={topPad}>
            <Col>
              <Form.Group>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Search for the groceries you need"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void => this.handleSearch(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col><h3 className="text-center">Basket</h3></Col>
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
    const itemAlreadyExists: boolean = this.state.cartLineItems.find((item) => item.name === itemName) != undefined
    console.log(itemAlreadyExists)
    if (!itemAlreadyExists) {
      this.setState({
        cartLineItems: [...this.state.cartLineItems, newItem]
      })
    }
  }
}
