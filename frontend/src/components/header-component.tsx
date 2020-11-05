import React from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

const HeaderComponent = () =>
  <header>
    <Navbar
      collapseOnSelect bg="dark"
      expand="lg" variant="dark"
    >
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to={'/cart'}>
              <Nav.Link>
                <i className="fas fa-shopping-cart" /> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/login'}>
              <Nav.Link>
                <i className="fas fa-user"> Sign In</i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>;


export default HeaderComponent;
