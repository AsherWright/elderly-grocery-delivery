import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {

    render(): JSX.Element {

        return (
            <Link
                to="/groceries"
                role="button"
            >
                Make an Order
            </Link>
        );
    }
}

export default Home;