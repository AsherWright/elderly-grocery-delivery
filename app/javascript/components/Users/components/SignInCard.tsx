import React, { useState, useContext } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';

interface SignInUserResponse {
    id: string;
    email: string;
}

function submitForm(event: React.FormEvent<HTMLFormElement>, email: string, password: string, setRedirect: (val: boolean) => void, setUser: (val: string) => void): void {
    event.preventDefault()

    const usersUrl = "/users/sign_in";
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

    const signInBody = { user: { email, password } }

    const params = {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signInBody)
    }

    fetch(usersUrl, params).then((response: Response) => {
        if (response.ok) {
            return response.json() as Promise<SignInUserResponse>;
        }
        throw new Error("Network response was not ok on user sign in.");
    }).then((response) => {
        console.log(response)
        setUser(response.email)
        setRedirect(true)
    })
}

function renderRedirect(redirect: boolean): JSX.Element | null {
    if (redirect) {
        return <Redirect to='/' />
    }

    return null
}

function SignInCard(): JSX.Element {
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    return (
        <div>
            {renderRedirect(redirect)}
            <Card>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>Sign In</Card.Title>
                    <Card.Text className="text-muted" style={{ textAlign: "center" }}>Welcome back! Enter your information below to sign into your account.</Card.Text>
                    <hr />
                    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>): void => submitForm(event, email, password, setRedirect, userContext.setUser)}>
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
                        </Form.Group>
                        <hr />
                        <Button variant="primary" type="submit" block>
                            Log in
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignInCard;