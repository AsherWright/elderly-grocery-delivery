import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Home(): JSX.Element {
    const { t } = useTranslation();

    return (
        <Link to="/groceries" role="button">
            {t("home.make_order")}
        </Link>
    );
}

export default Home;