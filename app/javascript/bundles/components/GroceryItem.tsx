import React from 'react';

export interface GroceryItemProps {
  name: string;
  price_range: string;
  quantity: string;
}

export default class GroceryItem extends React.Component<GroceryItemProps> {

  render() {
    return (
      <p>{this.props.name} {this.props.price_range} {this.props.quantity}</p>
    );
  }
}
