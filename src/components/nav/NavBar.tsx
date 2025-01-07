import { NavLink } from 'react-router-dom';
import { LOGIN_URL, REGISTER_URL, ROOT_URL, TRAVEL_PLAN_MANAGEMENT_URL, TRAVEL_PLAN_URL, USER_PROFILE_FORM_URL, USER_PROFILE_VIEW_URL } from '../../consts/PageUrls';
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
import { getUsernameFromJwt } from '../../utils/LocalStorageUtils';

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
