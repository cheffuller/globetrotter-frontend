import "./LoginForm.css";
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { loginRequest } from './LoginService';
import { ResponseMessage } from '../response-message/ResponseMessage';
import { HttpStatusCode } from 'axios';
import { useAuth } from '../../common/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '../../consts/PageUrls';
import { AccountRole } from '../../enums/AccountRole';

export function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginMode, setLoginMode] = useState<AccountRole>(AccountRole.User);
    const { startWaitingForResponse, stopWaitingAfterFailure, stopWaitingAfterSuccess, getResponseMessage } = ResponseMessage();
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e: any) {
        e.preventDefault();

        const credentials = {
            accountRole: loginMode,
            username: username,
            password: password
        };

        try {
            startWaitingForResponse();
            const jwtToken = await loginRequest(credentials);
            stopWaitingAfterSuccess();
            login(jwtToken);
            navigate(HOME_URL);
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

    function changeLoginMode() {
        if (loginMode === AccountRole.User) {
            setLoginMode(AccountRole.Moderator);
        } else {
            setLoginMode(AccountRole.User);
        }
    }

    return <>
        <div className='container mt-5 text-center login'>
            <Form onSubmit={handleLogin}>
                <h4>
                    {loginMode === AccountRole.User ?
                        "User Login" :
                        "Moderator Login"
                    }
                </h4>
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

                <Button variant="primary" type="submit" className="loginFormButton">
                    Login
                </Button>
                <Button onClick={changeLoginMode} className="loginFormButton">
                    {loginMode === AccountRole.User ?
                        "Switch to moderator login" :
                        "Switch to user login"
                    }
                </Button>
            </Form>
        </div>
    </>;
}