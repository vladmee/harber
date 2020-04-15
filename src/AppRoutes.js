import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container, Col, Row } from "react-bootstrap";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";

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
              <Route path="/token/:id" exact component={OneToken} />
              <Route path="/" exact component={AllTokens} />
              <Route path="/metadata" exact component={Metadata} />
              {/* 
                For static pages where you don't need to interact with a contract just use <Route>
                
                For dynamic pages that need access to a contract use <DrizzleRoute>
              */}
              <Footer />
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default AppRoutes;
