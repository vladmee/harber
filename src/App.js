import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DrizzleProvider } from "drizzle-react";
import OfflineContainer from "./OfflineContainer"; // modified from drizzle-react-components

import { Container, Col, Row } from "react-bootstrap";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";

import drizzleOptions from "./drizzleOptions";
import BaseContainer from "./BaseContainer";
import FrontBaseContainer from "./FrontBaseContainer";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <OfflineContainer>
          <BaseContainer />
        </OfflineContainer>
      </DrizzleProvider>
    );
  }
}

class AppFront extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <OfflineContainer>
          <FrontBaseContainer />
        </OfflineContainer>
      </DrizzleProvider>
    );
  }
}

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
              <Route path="/token" exact component={App} />
              <Route path="/" exact component={AppFront} />
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
