import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Container, Navbar, Nav } from "react-bootstrap";
import logo_horz_light from "../../assets/harber/logo_horz_light.svg";

const Navigation = () => {
  return (
    <Container>
      <Navbar collapseOnSelect expand="md">
        <Navbar.Brand href="/">
          <img
            src={logo_horz_light}
            height="50"
            className="d-inline-block align-top"
            alt="Harber logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/" className="nav-link text-uppercase mr-0 mr-md-3rem">
              Markets
            </NavLink>
            <NavLink to="#" className="nav-link text-uppercase mr-0 mr-md-3rem">
              FAQ
            </NavLink>
            <NavLink to="#" className="nav-link text-uppercase">
              My teams
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default withRouter(Navigation);
