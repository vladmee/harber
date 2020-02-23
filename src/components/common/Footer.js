import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import logo_vert_light from "../../assets/harber/logo_vert_light.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row style={{ marginBottom: 60 }}>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center text-center text-md-left"
          >
            <dl>
              <dd>
                <a href="#" className="text-dark">
                  FAQ
                </a>
              </dd>
              <dd>
                <a href="#" className="text-dark">
                  Github
                </a>
              </dd>
              <dd>
                <a href="#" className="text-dark">
                  Audit
                </a>
              </dd>
              <dd>
                <a href="#" className="text-dark">
                  Team
                </a>
              </dd>
            </dl>
          </Col>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center mb-3 mb-md-0"
          >
            <img
              src={logo_vert_light}
              height="180"
              alt="Harber logo"
              className="mb-3 mb-md-0"
            />
          </Col>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            <dl className="row mb-0">
              <dd className="mr-3">
                <a href="#" target="_blank">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </dd>
              <dd className="mr-3">
                <a href="#" target="_blank">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </dd>
              <dd>
                <a href="#" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </dd>
            </dl>
          </Col>
        </Row>
        <Row>
          <p className="text-center small w-100">© Harber, 2020</p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
