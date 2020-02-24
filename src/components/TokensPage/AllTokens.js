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
  constructor(props, context) {
    super();
    this.utils = context.drizzle.web3.utils;
    this.contracts = context.drizzle.contracts;
    this.currentContext = context;
    this.state = {
      contractsReady: false,
      sumOfAllPrices: 0
    };
  }

  getArtworkPrice(props, tokenPriceKey) {
    return new this.utils.BN(
      props.contracts["Harber"]["price"][tokenPriceKey].value
    );
  }

  componentWillUpdate() {
    if (!this.state.contractsReady) {
      if (
        Object.keys(this.props.contracts["Harber"]["price"]).length ===
        teams.length
      ) {
        this.setState({ contractsReady: true });
        let sum = 0;

        teams.map(async token => {
          const tokenPriceKey = this.currentContext.drizzle.contracts.Harber.methods.price.cacheCall(
            token.id
          );

          if (tokenPriceKey in this.props.contracts["Harber"]["price"]) {
            const price = await this.utils.fromWei(
              this.getArtworkPrice(this.props, tokenPriceKey),
              "ether"
            );
            sum += Number(price);
            this.setState({ sumOfAllPrices: sum });
          }
        });
      }
    }
  }

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
                        sumOfAllPrices={this.state.sumOfAllPrices}
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
