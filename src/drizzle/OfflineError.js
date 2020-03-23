import React from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { ReactComponent as Wave } from "../assets/dividers/wave.svg";

const OfflineError = props => {
  return (
    <section className="section-wave section-dark">
      <Container>
        <Row>
          <Alert
            variant="light"
            className="row text-center justify-content-center align-items-center"
          >
            <Col xs={2}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
            <Col xs={10}>
              Please ensure you have metamask installed, logged in, and set to
              Kovan.
            </Col>
          </Alert>
        </Row>
      </Container>
      <Wave className="wave wave-dark" />
    </section>
  );
};

export default OfflineError;
