import React from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import logo_icon_dark from "../../assets/harber/logo_icon_dark.svg";
import { ReactComponent as Wave } from "../../assets/dividers/wave.svg";

const LearnMore = () => {
  return (
    <section className="section-wave section-dark">
      <Container>
        <Row>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={logo_icon_dark}
              height="100"
              alt="Harber logo"
              className="mb-3 mb-md-0"
            />
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="text-light mb-3 mb-md-0 text-center text-md-left">
              Harber is a unique gambling platform, built on top of Augur,
              <br />
              where instead of betting on a team, you own the team.
            </p>
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <Button variant="link">Learn more</Button>
          </Col>
        </Row>
      </Container>
      <Wave className="wave wave-dark" />
    </section>
  );
};

export default LearnMore;
