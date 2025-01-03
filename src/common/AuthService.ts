import { jwtDecode } from 'jwt-decode';
import { JWT_TOKEN } from '../consts/JwtConst';

interface Token {
  sub: string;
  AccountRole: string;
  exp: number;
  iat: number;
}

export const setJwtToken = (jwtToken: string) => {
  localStorage.setItem(JWT_TOKEN, jwtToken);
  window.dispatchEvent(new Event('storage'));
};

export const getJwtToken = () => {
  return localStorage.getItem(JWT_TOKEN);
};

export const removeJwtToken = () => {
  localStorage.removeItem(JWT_TOKEN);
  window.dispatchEvent(new Event('storage'));
};

export const getUsername = () => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    try {
    const decodedToken: Token = jwtDecode(jwtToken);
    return decodedToken.sub;
    } catch (err) {
      console.log(err)
    }
  }
}

export const isAuthenticated = () => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    try {
      const decodedToken: Token = jwtDecode(jwtToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return false;
};
