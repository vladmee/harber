import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";

import Token from "../tokens/Token";
import LearnMore from "./LearnMore";
import LeagueInfo from "./LeagueInfo";

import { teams } from "../tokens/teams";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ReactComponent as Wave } from "../../assets/dividers/wave.svg";

class AllTokens extends Component {
  render() {
    return (
      <>
        <LearnMore />
        <LeagueInfo />
        <section className="section-wave section-dark">
          <Container>
            <Row>
              {teams.map(team => {
                return (
                  <Col
                    key={team.id}
                    md={4}
                    className="d-flex align-items-stretch"
                  >
                    <Card
                      as={"a"}
                      href={`/token?id=${team.id}`}
                      className="d-block w-100"
                    >
                      <Token
                        urlId={team.id}
                        name={team.name}
                        image={team.logo}
                      />
                    </Card>
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
