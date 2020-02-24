import React from "react";
import { Container, Row, Alert } from "react-bootstrap";
import { ReactComponent as Wave } from "../assets/dividers/wave.svg";

const OfflineError = props => {
  return (
    <section className="section-wave section-dark">
      <Container>
        <Row>
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            Please ensure you have metamask installed, logged in, and set to
            Kovan. If you do not have metamask please click{" "}
            <a href="offline/index.html">here</a> for an 'offline' version which
            cannot be interacted with.
          </Alert>
        </Row>
      </Container>
      <Wave className="wave wave-dark" />
    </section>
  );
};

export default OfflineError;
