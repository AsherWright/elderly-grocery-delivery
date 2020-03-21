import PropTypes from 'prop-types';
import React from 'react';

export default class Delivery extends React.Component {
  render() {
    return (
      <div>
        <h3>
          Hello, Asher!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
        </form>
      </div>
    );
  }
}
