import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";

import BuyTokenSection from "./BuyTokenSection";
import ActionSection from "./ActionSection";
import DetailsSection from "./DetailsSection";
import LeaderboardSection from "./LeaderboardSection";

import { Container, Row, Col } from "react-bootstrap";
import Token from "../tokens/Token";
import { teams } from "../tokens/teams";
import { ReactComponent as Wave } from "../../assets/dividers/wave.svg";
import { ReactComponent as Div1 } from "../../assets/dividers/vert-col.svg";
import { ReactComponent as Div2 } from "../../assets/dividers/horz-col-1.svg";
import { ReactComponent as Div3 } from "../../assets/dividers/horz-col-2.svg";
import { ReactComponent as Div4 } from "../../assets/dividers/horz-row.svg";

var url_string = window.location.href;
var url = new URL(url_string);
var urlId = url.searchParams.get("id");

class AllTokens extends Component {
  render() {
    return (
      <section className="section-wave section-dark">
        <Container className="container-full">
          <Row noGutters className="position-relative">
            <Col lg={6}>
              <div className="grid-tile top-left position-relative">
                <Token
                  urlId={teams[urlId].id}
                  name={teams[urlId].name}
                  image={teams[urlId].logo}
                />
                <Div2 className="div div-2 d-none d-lg-block" />
              </div>
              <div className="grid-tile">
                <DetailsSection />
              </div>
            </Col>
            <Col lg={6} className="d-flex flex-column">
              <div className="grid-tile top-right position-relative">
                <BuyTokenSection />
                <Div3 className="div div-3 d-none d-lg-block" />
              </div>
              <div
                className="grid-tile d-flex flex-column align-items-center justify-content-center"
                style={{ flex: 1 }}
              >
                <ActionSection />
              </div>
            </Col>
            <Div1 className="div div-1 d-none d-lg-block" />
            <Div4 className="div div-4 d-none d-lg-block" />
          </Row>
          <Row noGutters>
            <div className="grid-tile bottom-right bottom-left">
              <LeaderboardSection />
            </div>
          </Row>
        </Container>
        <Wave className="wave wave-dark" />
      </section>
    );
  }
}

AllTokens.contextTypes = {
  drizzle: PropTypes.object
};

AllTokens.propTypes = {};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3
  };
};

export default drizzleConnect(AllTokens, mapStateToProps);
