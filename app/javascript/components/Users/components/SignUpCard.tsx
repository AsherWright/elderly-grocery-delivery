import React, { useState, useContext } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { useTranslation } from 'react-i18next';

interface User {
    email: string;
    password: string;
    name: string;
}

function submitForm(event: React.FormEvent<HTMLFormElement>, user: User, setRedirect: (val: boolean) => void, setUser: (val: string) => void): void {
    event.preventDefault()

    const usersUrl = "/users";
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

    const signUpBody = { user: { ...user } }

    const params = {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpBody)
    }

    fetch(usersUrl, params).then((response: Response) => {
        if (response.ok) {
            return response.json() as Promise<{ name: string }>;
        }
        throw new Error("Network response was not ok on user create.");
    }).then((response): void => {
        setUser(response.name)
        setRedirect(true)
    })
}

function renderRedirect(redirect: boolean): JSX.Element | null {
    if (redirect) {
        return <Redirect to='/' />
    }

    return null
}

function SignUpCard(): JSX.Element {
    const { t } = useTranslation();
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);

    return (
        <div>
            {renderRedirect(redirect)}
            <Card>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>{t('sign_up_card.welcome')}</Card.Title>
                    <Card.Text className="text-muted" style={{ textAlign: "center" }}>{t('sign_up_card.getting_started')}</Card.Text>
                    <hr />
                    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>): void => submitForm(event, { email, password, name }, setRedirect, userContext.setUser)}>
                        <Form.Group>
                            <Form.Label>{t('shared.email')}</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('shared.password')}</Form.Label>
                            <Form.Control
                                value={password}
                                type="password"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
                            />
                            <Form.Text className="text-muted">{t('sign_up_card.password_criteria')}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('sign_up_card.confirm_password')}</Form.Label>
                            <Form.Control
                                value={confirmedPassword}
                                type="password"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setConfirmedPassword(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('sign_up_card.name')}</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setName(event.target.value)}
                            />
                        </Form.Group>
                        <hr />
                        <Button variant="primary" type="submit" block>
                            {t('sign_up_card.create_account')}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUpCard;