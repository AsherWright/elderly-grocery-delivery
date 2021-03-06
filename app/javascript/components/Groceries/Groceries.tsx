import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { withTranslation, WithTranslation } from 'react-i18next';
import { GroceryList, Basket } from './components';
import { GroceryItem } from '../types';
import { ApiGroceryItem, ApiOrder } from '../api-types';

interface GroceryLineItem extends GroceryItem {
    quantity: number;
    new: boolean;
}

interface GroceriesState {
    groceryItems: GroceryItem[];
    searchLineItems: GroceryLineItem[];
    cartLineItems: GroceryLineItem[];
    unauthorized: boolean;
    dataLoaded: boolean;
}

type GroceriesProps = RouteComponentProps & WithTranslation;

class Groceries extends React.Component<GroceriesProps, GroceriesState> {
    constructor(props: GroceriesProps) {
        super(props)

        this.state = {
            groceryItems: [],
            searchLineItems: [],
            cartLineItems: [],
            unauthorized: false,
            dataLoaded: false
        }

        this.addItemToCart = this.addItemToCart.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.handleListQuantityChange = this.handleListQuantityChange.bind(this);
        this.handleCartQuantityChange = this.handleCartQuantityChange.bind(this);
        this.modifyItemInList = this.modifyItemInList.bind(this);
        this.handleCreateOrder = this.handleCreateOrder.bind(this);
        this.addNewItemToBasket = this.addNewItemToBasket.bind(this);
        this.getTotalCartPrice = this.getTotalCartPrice.bind(this);
        this.getMaxQuantity = this.getMaxQuantity.bind(this);
    }

    componentDidMount(): void {
        const url = "/api/v1/grocery_items/index";

        fetch(url).then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<ApiGroceryItem[]>;
            } else if (response.status === 401) {
                this.setState({ unauthorized: true })
            }
            throw new Error("Network response was not ok.");
        }).then(response => this.setState(
            {
                groceryItems: response.map(groceryListItem => ({ ...groceryListItem, quantity: 1, image: "" })),
                dataLoaded: true
            }
        ))
    }

    handleSearch(text: string): void {
        const regex = new RegExp(text, "i");
        const matchingGroceryItems = text === "" ? [] : this.state.groceryItems.filter(x => regex.test(x.name))

        const searchLineItems: GroceryLineItem[] = matchingGroceryItems.map((item) => {
            return {
                ...item,
                quantity: 1,
                new: false,
            }
        });

        this.setState({ searchLineItems })
    }

    handleCreateOrder(): void {
        const lineItemsUrl = "/api/v1/order_line_items/create";
        const ordersUrl = "/api/v1/orders/create";
        const groceriesUrl = "/api/v1/grocery_items/create";

        const { cartLineItems } = this.state;

        if (cartLineItems.length == 0)
            return;

        const docToken = document.querySelector('meta[name="csrf-token"]');
        const token = docToken && docToken.getAttribute("content") || "";

        const fetchParams = (body: string): RequestInit => {
            return {
                method: "POST",
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                },
                body
            }
        }

        const orderBody = {
            status: "unconfirmed"
        }

        fetch(ordersUrl, fetchParams(JSON.stringify(orderBody))).then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<ApiOrder>;
            }
            throw new Error("Network response was not ok on order create.");
        }).then((createOrderResponse: ApiOrder) => {
            const groceriesBody = {
                items: cartLineItems.filter(x => x.new).map((item) => {
                    return {
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    }
                })
            };

            fetch(groceriesUrl, fetchParams(JSON.stringify(groceriesBody))).then((response: Response) => {
                if (response.ok) {
                    return response.json() as Promise<ApiGroceryItem[]>;
                }
                throw new Error("Network response was not ok on groceries create.");
            }).then((createGroceriesResponse: ApiGroceryItem[]) => {
                const lineItemsBody = {
                    items: cartLineItems.map((item) => {
                        return {
                            quantity: item.quantity,
                            order_id: createOrderResponse.id,
                            grocery_item_id: item.new ? createGroceriesResponse.find((x) => x.name == item.name)?.id : item.id
                        }
                    })
                };

                fetch(lineItemsUrl, fetchParams(JSON.stringify(lineItemsBody))).then((response: Response) => {
                    if (response.ok) {
                        this.props.history.push('/orders/' + createOrderResponse.id)
                        return;
                    }
                    throw new Error("Network response was not ok on line items create.")
                })
            })
        }).catch((error: Error) => console.log(error.message));
    }

    render(): JSX.Element {
        return (
            <>
                {this.getRedirect()}
                {this.getGroceriesPage()}
            </>
        );
    }

    getRedirect(): JSX.Element | null {
        if (this.state.unauthorized)
            return <Redirect to="/users" />

        return null
    }

    getGroceriesPage(): JSX.Element | null {
        if (!this.state.dataLoaded)
            return null;

        const { t } = this.props

        return (
            <Container fluid>
                <Row className="justify-content-md-center pt-4">
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
                    <Col sm={12} md={6}>
                        <GroceryList
                            items={this.state.searchLineItems}
                            handleAddButtonPressed={this.addItemToCart}
                            handleQuantityChange={this.handleListQuantityChange}
                            onAddNewItem={this.addNewItemToBasket}
                            maxQuantityPerItem={this.getMaxQuantity()}
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <Basket
                            items={this.state.cartLineItems}
                            handleRemovedButtonPressed={this.removeItemFromCart}
                            handleQuantityChange={this.handleCartQuantityChange}
                            handleCreateOrder={this.handleCreateOrder}
                            totalCartPrice={this.getTotalCartPrice(this.state.cartLineItems)}
                            maxQuantityPerItem={this.getMaxQuantity()}
                        />
                    </Col>
                </Row>
            </Container>
        )
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
            const quantity = Math.min(searchItem.quantity + correspondingCartItem.quantity, this.getMaxQuantity())

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
        const newItem: GroceryLineItem = {
            name: itemName,
            price: Number(itemPrice),
            quantity: 1,
            id: itemName,
            new: true,
            image: ""
        }

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

    getMaxQuantity(): number {
        return 5;
    }
}

export default withTranslation()(Groceries);