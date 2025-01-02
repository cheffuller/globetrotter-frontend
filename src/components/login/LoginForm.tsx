import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { loginRequest } from './LoginService';
import { UnauthorizedError } from '../../errors/HttpErrors';

export function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleLogin(e: any) {
        e.preventDefault();

        const credentials = {
            username: username,
            password: password
        };

        try {
            await loginRequest(credentials);
            // navigate to home page after authentication
        } catch (error: any) {
            switch (error) {
                case UnauthorizedError:
                    // display red text saying "Invalid credentials."
                    break;
                default:
                    // display red text saying "Server unavailable."
                    break;
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </>;
}