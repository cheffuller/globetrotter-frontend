import React, { useState } from 'react'
import axios from 'axios';
import { API_URL } from '../../consts/ApiUrl';
import Login from './Login';


const LoginManagement = () => {
    const [token, setToken] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (e: any) => {
      e.preventDefault();
  
      const credentials = { 
        username: username,
        password: password
      };
  
      try {
        const response = await axios.post(`${API_URL}users/login`, credentials);
        
        if (!response.status) {
          throw new Error('Login failed');
        }
  
        setToken(response.data);
        localStorage.setItem('jwtToken', token);
  
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
  return (
    <>
    <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
    </>
  )
}

export default LoginManagement