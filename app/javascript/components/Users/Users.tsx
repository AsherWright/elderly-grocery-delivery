import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import { SignInCard, SignUpCard } from './components';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

enum UsersPageType {
    SignIn,
    SignUp
}

function getCard(pageType: UsersPageType): JSX.Element {
    if (pageType == UsersPageType.SignIn) {
        return <SignInCard />
    } else {
        return <SignUpCard />
    }
}

function getBelowCardPrompt(pageType: UsersPageType, setPageType: (type: UsersPageType) => void, t: TFunction): JSX.Element {
    if (pageType == UsersPageType.SignIn) {
        return (
            <>
                {t('users.no_account')} <a onClick={(): void => setPageType(UsersPageType.SignUp)} style={{ cursor: 'pointer' }}>{t('users.create_one')}</a>
            </>
        );
    } else {
        return (
            <>
                {t('users.account_already')} <a onClick={(): void => setPageType(UsersPageType.SignIn)} style={{ cursor: 'pointer' }}>{t('users.sign_in_here')}</a>
            </>
        );
    }
}

function Users(): JSX.Element {
    const [pageType, setPageType] = useState(UsersPageType.SignIn);
    const { t } = useTranslation();

    return (
        <Container >
            <Row className="mt-4">
                <Col xs={1} lg={3} />
                <Col xs={10} lg={6}>{getCard(pageType)}</Col>
                <Col xs={1} lg={3} />
            </Row>
            <Row>
                <Col xs={1} lg={3} />
                <Col xs={10} lg={6} style={{ textAlign: "center" }}>
                    <small>{getBelowCardPrompt(pageType, setPageType, t)}</small>
                </Col>
                <Col xs={1} lg={3} />
            </Row>
        </Container >
    )
}

export default Users;