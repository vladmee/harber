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
                <a href="/faq" className="text-dark">
                  FAQ
                </a>
              </dd>
              <dd>
                <a href="/github" className="text-dark">
                  Github
                </a>
              </dd>
              <dd>
                <a href="/audit" className="text-dark">
                  Audit
                </a>
              </dd>
              <dd>
                <a href="/team" className="text-dark">
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
                <a href="/github" target="_blank">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </dd>
              <dd className="mr-3">
                <a href="/twitter" target="_blank">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </dd>
              <dd>
                <a href="/instagram" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </dd>
              {/* 
                The following code adds a new social media icon:

                <dd>
                  <a href="<INSERT DIRECT LINK TO YOUR PROFILE>" target="_blank">
                    <FontAwesomeIcon icon={<INSERT ICON NAME>} size="lg" />
                  </a>
                </dd>

                TO ADD A NEW ICON:
                1. Import from font awesome like faFacebook
                2. Insert it in the code above
              */}
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
