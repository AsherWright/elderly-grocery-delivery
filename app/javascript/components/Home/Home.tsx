import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { TFunction } from 'i18next';

function Home(): JSX.Element {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Button onClick={(): Promise<TFunction> => i18n.changeLanguage('en')}>en</Button>
            <Button onClick={(): Promise<TFunction> => i18n.changeLanguage('fr')}>fr</Button>
            <Link
                to="/groceries"
                role="button"
            >
                {t("home.make_order")}
            </Link>
        </>
    );
}

export default Home;