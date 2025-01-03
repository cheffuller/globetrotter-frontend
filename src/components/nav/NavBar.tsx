import React from 'react';
import { NavLink} from 'react-router-dom';
import { LOGIN_URL, REGISTER_URL, ROOT_URL } from '../../consts/PageUrls';
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import { useAuth } from '../../common/AuthContext';

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Navbar expand='lg' className='navbar-custom'>
      <Container>
        <Navbar.Brand as={NavLink} to='#home' className='navbar-brand'>
          GlobeTrotter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            <Nav.Link as={NavLink} to={ROOT_URL}>
              Home
            </Nav.Link>
            {isLoggedIn && <Nav.Link onClick={logout}>{'Logout'}</Nav.Link>}
            {!isLoggedIn && (
              <Nav.Link as={NavLink} to={LOGIN_URL}>
                Login
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={NavLink} to={REGISTER_URL}>
                Register
              </Nav.Link>
            )}
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item as={NavLink} to='#action/3.1'>
                Action
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='#action/3.3'>
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form>
            <Row>
              <Col xs='auto'>
                <Form.Control
                  type='text'
                  placeholder='Search'
                  className=' mr-sm-2'
                />
              </Col>
              <Col xs='auto'>
                <Button className='search' type='submit'>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
