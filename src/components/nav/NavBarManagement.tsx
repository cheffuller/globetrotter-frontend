import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
// import { jwtDecode } from 'jwt-decode';

interface Token {
  exp: number;
}

const NavBarManagement = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decodedToken: Token = jwtDecode(token);
  //       console.log(decodedToken)
  //       if (decodedToken.exp * 1000 > Date.now()) {
  //         setIsAuthenticated(true);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [token]);
  // isAuthenticated={isAuthenticated} 

  return (
    <>
      <NavBar />
    </>
  );
};

export default NavBarManagement;
