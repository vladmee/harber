import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import PriceSection from "../PriceSection";
import DaiBalanceSection from "./DaiBalanceSection";
import TestDaiFaucetSection from "../TestFaucet/TestDaiFaucetSection";

import BuyArtworkSection from "./BuyArtworkSection";
import ActionSection from "./ActionSection";
import DetailsSection from "./DetailsSection";

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

class ArtAndPriceSection extends Component {
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
              <div className="grid-tile bottom-left">
                <DetailsSection />
              </div>
            </Col>
            <Col lg={6} className="d-flex flex-column">
              <div className="grid-tile top-right position-relative">
                <BuyArtworkSection />
                <Div3 className="div div-3 d-none d-lg-block" />
              </div>
              <div
                className="grid-tile bottom-right d-flex flex-column align-items-center justify-content-center"
                style={{ flex: 1 }}
              >
                <ActionSection />
              </div>
            </Col>
            <Div1 className="div div-1 d-none d-lg-block" />
            <Div4 className="div div-4 d-none d-lg-block" />
          </Row>
        </Container>
        <Wave className="wave wave-dark" />
      </section>
    );
  }
}

ArtAndPriceSection.contextTypes = {
  drizzle: PropTypes.object
};

ArtAndPriceSection.propTypes = {};

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

export default drizzleConnect(ArtAndPriceSection, mapStateToProps);