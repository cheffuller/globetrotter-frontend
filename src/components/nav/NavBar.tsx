import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_URL, REGISTER_URL, ROOT_URL, TRAVEL_PLAN_MANAGEMENT_URL, TRAVEL_PLAN_URL, USER_PROFILE_FORM_URL, USER_PROFILE_VIEW_URL } from '../../consts/PageUrls';
import {
    Button,
    Col,
    Container,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    Row,
} from 'react-bootstrap';
import { useAuth } from '../../common/AuthContext';
import { getUsernameFromJwt } from '../../utils/LocalStorageUtils';
import { useRef, useState } from 'react';

const NavBar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");

    function searchUser(event: any) {
        event.preventDefault();
        navigate(USER_PROFILE_VIEW_URL(username));
    }

    return (
        <Navbar expand='md' className='navbar-custom' variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to={ROOT_URL} className='navbar-brand'>
                    GlobeTrotter
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='m-auto'>
                        {isLoggedIn ? <>
                            <Nav.Link as={NavLink} to={TRAVEL_PLAN_URL}>Travel Plan</Nav.Link>
                            <Nav.Link as={NavLink} to={TRAVEL_PLAN_MANAGEMENT_URL}>View Plans</Nav.Link>
                            <NavDropdown title={getUsernameFromJwt()} id='basic-nav-dropdown'>
                                <NavDropdown.Item as={NavLink} to={USER_PROFILE_VIEW_URL(getUsernameFromJwt())}>
                                    View Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={USER_PROFILE_FORM_URL}>
                                    Edit Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </> : <>
                            <Nav.Link as={NavLink} to={LOGIN_URL}>
                                Login
                            </Nav.Link>
                            <Nav.Link as={NavLink} to={REGISTER_URL}>
                                Register
                            </Nav.Link>
                        </>
                        }
                    </Nav>

                    <Form onSubmit={searchUser}>
                        <Row>
                            <Col xs='auto'>
                                <Form.Control
                                    type='text'
                                    placeholder='Username'
                                    className=' mr-sm-2'
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Col>
                            <Col xs='auto'>
                                <Button
                                    type="submit"
                                    className='search'>
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Navbar.Collapse>
                <Navbar.Brand className='navbar-brand'></Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;
