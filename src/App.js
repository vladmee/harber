import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Router, Route } from "react-router-dom";
import { history, store } from "./store";

import { Container, Col, Row } from "react-bootstrap";

import DrizzleWarning from "./drizzle/DrizzleWarning";

import ScrollToTop from "./components/common/ScrollToTop";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";

import Home from "./components/pages/Home";
import OneToken from "./components/TokenPage/OneToken";

const { useDrizzleState } = drizzleReactHooks;

const App = () => {
  const drizzleStatus = useDrizzleState((state) => state.drizzleStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (drizzleStatus && drizzleStatus.initialized && window.web3) {
      window.web3.version.getNetwork((error, networkId) => {
        const status = networkId === "42";
        // dispatch(updateDrizzleInit(status));
      });
    } else {
      // dispatch(updateDrizzleInit(false));
    }
  }, [drizzleStatus.initialized]);

  return (
    <Router history={history} store={store}>
      <ScrollToTop />
      <Container fluid className="px-0">
        <Row noGutters className="mx-0">
          <Col className="px-0">
            <Navigation />
            <DrizzleWarning />
            <Route path="/token/:id" exact component={OneToken} />
            <Route path="/" exact component={Home} />
            <Footer />
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
