import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import shortenAddress from "../utils/shortenAddress";
import toEth from "../utils/toEth";

import { Container, Navbar, Nav, Button } from "react-bootstrap";
import logo_horz_light from "../../assets/logo/logo_horz_light.svg";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

const Navigation = () => {
  const { drizzle, useCacheCall } = useDrizzle();
  const { drizzleState, initialized, currentUser } = useDrizzleState(
    (drizzleState) => ({
      drizzleState: drizzleState,
      initialized: drizzleState.drizzleStatus.initialized,
      currentUser: drizzleState.accounts[0],
    })
  );

  return (
    <Container>
      <Navbar collapseOnSelect expand="md">
        <Navbar.Brand href="/">
          <img
            src={logo_horz_light}
            height="50"
            className="d-inline-block align-top"
            alt="RealityCards logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              to="/markets"
              exact
              className="nav-link text-uppercase mr-0 mr-md-3rem"
            >
              Markets
            </NavLink>
            <NavLink
              to="/faq"
              exact
              className="nav-link text-uppercase mr-0 mr-md-3rem"
            >
              FAQ
            </NavLink>
            <NavLink to="my-tokens" exact className="nav-link text-uppercase">
              My Tokens
            </NavLink>
          </Nav>

          {initialized && currentUser ? (
            <>
              {" "}
              <span className="mx-3">|</span>
              <Navbar.Text className="small">
                Connected as: {shortenAddress(currentUser)} <br />
                Balance:{" "}
                <ContractData
                  contract="Cash"
                  method="balanceOf"
                  methodArgs={[currentUser]}
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  render={(balance) => toEth(balance, drizzle)}
                />{" "}
                DAI
              </Navbar.Text>{" "}
            </>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default withRouter(Navigation);
