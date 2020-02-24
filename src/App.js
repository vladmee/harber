import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container, Col, Row } from "react-bootstrap";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import DrizzleRoute from "./components/common/DrizzleRoute";

import AllTokens from "./components/TokensPage/AllTokens";
import OneToken from "./components/TokenPage/OneToken";

/* unused in contract, but keeping for now */
class Metadata extends Component {
  constructor() {
    super();
    this.data = {
      name: "Harber.io",
      description: "Harber.io",
      image: ""
    };
  }
  render() {
    return <div>{JSON.stringify(this.data)}</div>;
  }
}

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <Container fluid className="px-0">
          <Row className="mx-0">
            <Col className="px-0">
              <Navigation />
              <DrizzleRoute path="/token" exact component={OneToken} />
              <DrizzleRoute path="/" exact component={AllTokens} />
              <Route path="/metadata" exact component={Metadata} />
              <Footer />
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default AppRoutes;
