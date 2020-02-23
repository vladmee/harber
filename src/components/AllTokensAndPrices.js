import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";

import Token from "./tokens/Token";
import LearnMore from "./PricesPage/LearnMore";
import LeagueInfo from "./PricesPage/LeagueInfo";

import { teams } from "./tokens/teams";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Wave } from "../assets/dividers/wave.svg";

class ArtAndPriceSection extends Component {
  render() {
    return (
      <>
        <LearnMore />
        <LeagueInfo />
        <section className="section-wave section-black">
          <Container>
            <Row>
              {teams.map(team => {
                return (
                  <Col
                    key={team.id}
                    md={4}
                    className="d-flex align-items-stretch"
                  >
                    <Token urlId={team.id} name={team.name} image={team.logo} />
                  </Col>
                );
              })}
            </Row>
          </Container>
          <Wave className="wave wave-dark" />
        </section>
      </>
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
