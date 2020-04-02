import React, { useState, useContext } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface SignUpErrors {
    emailInvalid: boolean;
    emailTaken: boolean;
    passwordTooShort: boolean;
    passwordMismatch: boolean;
}

interface User {
    email: string;
    password: string;
    confirmedPassword: string;
    name: string;
}

interface SignUpResponse {
    name: string;
    errors?: { email?: string[]; password?: string[] };
}

function submitForm(
    event: React.FormEvent<HTMLFormElement>,
    user: User,
    setRedirect: (val: boolean) => void,
    setUser: (val: string) => void,
    setErrors: (errors: SignUpErrors) => void,
    errors: SignUpErrors,
): void {
    event.preventDefault()
    setErrors({ emailInvalid: false, emailTaken: false, passwordTooShort: false, passwordMismatch: false })

    if (user.confirmedPassword !== user.password) {
        setErrors({ ...errors, passwordMismatch: true });
        return;
    }

    const usersUrl = "/users";
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

    const signUpBody = { user: { email: user.email, password: user.password, name: user.name } }

    const params = {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpBody)
    }

    fetch(usersUrl, params).then((response: Response) => {
        if (response.ok || response.status == 422) {
            return response.json() as Promise<SignUpResponse>;
        }
        throw new Error("Network response was not ok on user create.");
    }).then((response): void => {
        if (response.errors) {
            setErrors(
                {
                    passwordMismatch: false,
                    emailInvalid: Boolean(response.errors?.email && response.errors?.email.includes("is invalid")),
                    emailTaken: Boolean(response.errors?.email && response.errors?.email.includes("has already been taken")),
                    passwordTooShort: Boolean(response.errors?.password && response.errors?.password.some((p) => p.includes("is too short") || p.includes("can't be blank")))
                }
            )
        } else {
            setUser(response.name)
            setRedirect(true)
        }
    })
}

function renderRedirect(redirect: boolean): JSX.Element | null {
    if (redirect) {
        return <Redirect to='/' />
    }

    return null
}

function getAlert(text: string): JSX.Element {
    return <Alert variant="danger">{text}</Alert>
}

function renderErrorsAlert(errors: SignUpErrors, t: TFunction): JSX.Element | null {
    if (errors.passwordMismatch) {
        return getAlert(t('sign_up_card.password_mismatch'))
    } else if (errors.emailInvalid) {
        return getAlert(t('sign_up_card.email_invalid'))
    } else if (errors.emailTaken) {
        return getAlert(t('sign_up_card.email_in_use'))
    } else if (errors.passwordTooShort) {
        return getAlert(t('sign_up_card.password_too_short'))
    } else {
        return null;
    }
}


function SignUpCard(): JSX.Element {
    const { t } = useTranslation();
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState<SignUpErrors>({ emailInvalid: false, emailTaken: false, passwordTooShort: false, passwordMismatch: false })

    return (
        <div>
            {renderRedirect(redirect)}
            <Card>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>{t('sign_up_card.welcome')}</Card.Title>
                    <Card.Text className="text-muted" style={{ textAlign: "center" }}>{t('sign_up_card.getting_started')}</Card.Text>
                    <hr />
                    {renderErrorsAlert(errors, t)}
                    <Form onSubmit={
                        (event: React.FormEvent<HTMLFormElement>): void => submitForm(
                            event,
                            { email, password, confirmedPassword, name },
                            setRedirect,
                            userContext.setUser,
                            setErrors,
                            errors
                        )
                    }>
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