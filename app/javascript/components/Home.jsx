import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { translations } from ''

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Grocery Delivery</h1>
        <p className="lead">
          For elders
        </p>
        <hr className="my-4" />
        <Link
          to="/delivery"
          className="btn btn-lg custom-button"
          role="button"
        >
          t('welcome')
        </Link>
      </div>
    </div>
  </div>
);

