import React from "react";
import { Link } from "react-router-dom";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import { Container, Row, Col, Button } from "react-bootstrap";
//import CardStack from "./CardStack";

const { useDrizzleState } = drizzleReactHooks;

const Home = (props) => {
  const { initialized } = useDrizzleState((drizzleState) => ({
    initialized: drizzleState.drizzleStatus.initialized,
  }));

  return (
    <header className="hero">
      <Container className="h-100">
        <Row className="h-100 align-items-center justify-content-around">
          <Col md={6}>
            <h1 className="text-white mb-3">
              RealityCards is a new type of prediction market, where instead of
              betting on a team, you own the team.
            </h1>
            <Link to="/markets" className="btn btn-primary">
              See all cards
            </Link>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column jusitfy-content-center align-items-center"
          >
            {/* <CardStack initialized={initialized} /> */}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Home;
