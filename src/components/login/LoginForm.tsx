import './LoginForm.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { loginRequest } from './LoginService';
import { ResponseMessage } from '../response-message/ResponseMessage';
import { HttpStatusCode } from 'axios';
import { useAuth } from '../../common/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '../../consts/PageUrls';
import { AccountRole } from '../../enums/AccountRole';

type LoginFormProps = {
  loginMode: AccountRole;
};

export function LoginForm({ loginMode }: LoginFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {
    startWaitingForResponse,
    stopWaitingAfterFailure,
    stopWaitingAfterSuccess,
    getResponseMessage,
  } = ResponseMessage();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();

    const credentials = {
      accountRole: loginMode,
      username: username,
      password: password,
    };

    try {
      startWaitingForResponse('Waiting for response from the server');
      const jwtToken = await loginRequest(credentials);
      stopWaitingAfterSuccess('Login successful.');
      login(jwtToken);
      navigate(HOME_URL);
    } catch (error: any) {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          stopWaitingAfterFailure('Invalid login credentials.');
          // send user to login and remove their current jwt
          break;
        case HttpStatusCode.BadRequest:
          stopWaitingAfterFailure('Invalid user profile details.');
          break;
        default:
          stopWaitingAfterFailure('Server is unavailable.');
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {getResponseMessage()}

        <Button
          variant='primary'
          type='submit'
          className='loginFormButton mt-4'
        >
          Login
        </Button>
      </Form>
    </>
  );
}
