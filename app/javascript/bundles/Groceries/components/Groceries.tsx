import { RouteComponentProps } from 'react-router-dom';
import { Container, Col, Row, Form, Navbar, Nav } from 'react-bootstrap';
import { GroceryList, Basket } from '../../components';
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

interface GroceryItem {
  id: string;
  name: string;
  price: number;
}

enum GroceryLineItemLocation {
  List,
  Cart,
}

interface GroceryLineItem extends GroceryItem {
  quantity: number;
  location: GroceryLineItemLocation;
}

interface GroceriesState {
  groceryItems: GroceryItem[];
  groceryLineItems: GroceryLineItem[];
}

export default class Groceries extends React.Component<RouteComponentProps, GroceriesState> {

  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      groceryItems: [],
      groceryLineItems: []
    }

    this.handleAddButtonPressed = this.handleAddButtonPressed.bind(this);
    this.handleRemoveButtonPressed = this.handleRemoveButtonPressed.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.changePropertiesOfGroceryLineItem = this.changePropertiesOfGroceryLineItem.bind(this);
    this.updateLineItemInList = this.updateLineItemInList.bind(this);
  }

  componentDidMount(): void {
    const url = "/api/v1/grocery_items/index";
    fetch(url)
      .then((response: Response) => {
        console.log(response)
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

  onSearch(text: string): void {
    const cartLineItems = this.state.groceryLineItems.filter(x => x.location == GroceryLineItemLocation.Cart)

    const regex = new RegExp(text, "i");
    const matchingGroceryItems = text == "" ? [] : this.state.groceryItems.filter(x => regex.test(x.name))

    const groceryLineItems = matchingGroceryItems.map((item) => {
      return {
        ...item,
        quantity: 1,
        location: GroceryLineItemLocation.List
      }
    });

    this.setState({ groceryLineItems: [...groceryLineItems, ...cartLineItems] })
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void => this.onSearch(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col><h3 className="text-center">Basket</h3></Col>
          </Row>
          <Row>
            <Col>
              <GroceryList
                items={this.getItemsInList()}
                handleAddButtonPressed={this.handleAddButtonPressed}
                handleQuantityChange={this.handleQuantityChange}
              />
            </Col>
            <Col>
              <Basket
                items={this.getItemsInCart()}
                handleRemovedButtonPressed={this.handleRemoveButtonPressed}
                handleQuantityChange={this.handleQuantityChange}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  getItemsInList(): GroceryLineItem[] {
    return this.state.groceryLineItems.filter((item) => item.location == GroceryLineItemLocation.List)
  }

  getItemsInCart(): GroceryLineItem[] {
    return this.state.groceryLineItems.filter((item) => item.location == GroceryLineItemLocation.Cart)
  }

  updateLineItemInList(lineItems: GroceryLineItem[], updatedItem: GroceryLineItem): GroceryLineItem[] {
    return lineItems.map((item) => item.id == updatedItem.id ? updatedItem : item)
  }

  changePropertiesOfGroceryLineItem(id: string, properties: Partial<GroceryLineItem>, moveToEnd: boolean): void {
    const groceryItem = this.state.groceryLineItems.find((item) => item.id === id) as GroceryLineItem

    if (moveToEnd) {
      this.setState({
        groceryLineItems: [
          ...this.state.groceryLineItems.filter((item) => item.id !== id),
          { ...groceryItem, ...properties }
        ]
      })
    } else {
      this.setState({
        groceryLineItems: this.updateLineItemInList(this.state.groceryLineItems, { ...groceryItem, ...properties })
      })
    }
  }

  handleAddButtonPressed(id: string): void {
    this.changePropertiesOfGroceryLineItem(id, { location: GroceryLineItemLocation.Cart }, true)
  }

  handleRemoveButtonPressed(id: string): void {
    this.changePropertiesOfGroceryLineItem(id, { location: GroceryLineItemLocation.List }, false)
  }

  handleQuantityChange(id: string, quantity: number): void {
    this.changePropertiesOfGroceryLineItem(id, { quantity }, false)
  }
}
