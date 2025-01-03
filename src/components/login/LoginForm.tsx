import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { loginRequest } from './LoginService';
import { ResponseMessage } from '../response-message/ResponseMessage';
import { HttpStatusCode } from 'axios';

export function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { startWaitingForResponse, stopWaitingAfterFailure, stopWaitingAfterSuccess, getResponseMessage } = ResponseMessage();

    async function handleLogin(e: any) {
        e.preventDefault();

        const credentials = {
            username: username,
            password: password
        };

        try {
            startWaitingForResponse();
            await loginRequest(credentials);
            stopWaitingAfterSuccess
            // navigate to home page after authentication
        } catch (error: any) {
            switch (error.status) {
                case HttpStatusCode.Unauthorized:
                    stopWaitingAfterFailure("Invalid login credentials.");
                    break;
                default:
                    stopWaitingAfterFailure("Server is unavailable.");
            }
        }
    };

    return <>
        <div className='container mt-5 text-center login'>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                {getResponseMessage()}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </>;
}