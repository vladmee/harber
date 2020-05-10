import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import shortenAddress from "../utils/shortenAddress";
import roundTwoDecimals from "../utils/roundTwoDecimals";

import { Container, Navbar, Nav, Button } from "react-bootstrap";
import logo_horz_light from "../../assets/logo/logo_horz_light.svg";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Navigation = () => {
  const { drizzle } = useDrizzle();
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);
  const { accounts, accountBalances } = drizzleState;
  const address = accounts["0"];

  // const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
  //   account: drizzleState.accounts[0]
  // }))

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (drizzleState) {
      setAccount(address);
    }
  }, [address]);

  useEffect(() => {
    if (Object.keys(accountBalances).length > 0 && address !== null) {
      setBalance(accountBalances[address].toString());
    }
  }, [accountBalances, address]);

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
            <NavLink
              to="/"
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

          {account && balance ? (
            <>
              {" "}
              <span className="mx-3">|</span>
              <Navbar.Text className="small">
                Connected as: {shortenAddress(account)} <br />
                Balance:{" "}
                {roundTwoDecimals(
                  drizzle.web3.utils.fromWei(balance, "ether")
                )}{" "}
                ETH
              </Navbar.Text>{" "}
            </>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default withRouter(Navigation);
