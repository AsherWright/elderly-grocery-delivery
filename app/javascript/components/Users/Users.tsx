import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import { SignInCard, SignUpCard } from './components';

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

function getBelowCardPrompt(pageType: UsersPageType, setPageType: (type: UsersPageType) => void): JSX.Element {
    if (pageType == UsersPageType.SignIn) {
        return (
            <>
                Don't have an account? <a onClick={(): void => setPageType(UsersPageType.SignUp)} style={{ cursor: 'pointer' }}>Create one here.</a>
            </>
        );
    } else {
        return (
            <>
                Already have an account? <a onClick={(): void => setPageType(UsersPageType.SignIn)} style={{ cursor: 'pointer' }}>Sign in here.</a>
            </>
        );
    }
}

function Users(): JSX.Element {
    const [pageType, setPageType] = useState(UsersPageType.SignIn);

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
                    <small>{getBelowCardPrompt(pageType, setPageType)}</small>
                </Col>
                <Col xs={1} lg={3} />
            </Row>
        </Container >
    )
}

export default Users;