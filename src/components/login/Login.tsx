import React, { Dispatch, SetStateAction } from 'react'
import { Button, Form } from 'react-bootstrap';

type LoginProps = {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    handleLogin: any;
}

const Login = ({username, setUsername, password, setPassword, handleLogin} : LoginProps) => {
  return (
    <div className='container mt-5 text-center login'>
        <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
  </Form>
  </div>
  )
}

export default Login