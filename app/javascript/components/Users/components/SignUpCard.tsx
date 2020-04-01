import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

interface User {
    email: string;
    password: string;
    name: string;
}

function submitForm(event: React.FormEvent<HTMLFormElement>, user: User, setRedirect: (val: boolean) => void): void {
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
            setRedirect(true)
            return response.json();
        }
        throw new Error("Network response was not ok on user create.");
    })
}

function renderRedirect(redirect: boolean): JSX.Element | null {
    if (redirect) {
        return <Redirect to='/' />
    }

    return null
}

function SignUpCard(): JSX.Element {
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
                    <Card.Title style={{ textAlign: "center" }}>Welcome to GoGetGroceries</Card.Title>
                    <Card.Text className="text-muted" style={{ textAlign: "center" }}>To get started, you'll need to create an account by filling out the form below.</Card.Text>
                    <hr />
                    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>): void => submitForm(event, { email, password, name }, setRedirect)}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={password}
                                type="password"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
                            />
                            <Form.Text className="text-muted">At least 6 characters long</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                value={confirmedPassword}
                                type="password"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setConfirmedPassword(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setName(event.target.value)}
                            />
                        </Form.Group>
                        <hr />
                        <Button variant="primary" type="submit" block>
                            Create Account
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUpCard;