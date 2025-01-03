import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { loginRequest } from './LoginService';
import { UnauthorizedError } from '../../errors/HttpErrors';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/AuthContext';

export function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleLogin(e: any) {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };

    try {
      const token = await loginRequest(credentials);
      login(token);
      navigate('/home');
    } catch (error: any) {
      switch (error) {
        case UnauthorizedError:
          setErrorMessage('Invalid credentials.');
          break;
        default:
          setErrorMessage('Server unavailable.');
          break;
      }
    }
  }

  return (
    <div className='login-background'>
      <div className='container mt-5 text-center login'>
        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
          <div className='error-message mt-3'>{errorMessage}</div>
        </Form>
      </div>
    </div>
  );
}
