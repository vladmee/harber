import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

// DUMMY DATA
const leaderboardData = [
  {
    address: "0x34a971ca2fd6da2ce1859671",
    timeHeld: "5 days"
  },
  {
    address: "0x34a971ca2fd6da2ce1859671",
    timeHeld: "5 days"
  },
  {
    address: "0x34a971ca2fd6da2ce1859671",
    timeHeld: "5 days"
  },
  {
    address: "0x34a971ca2fd6da2ce1859671",
    timeHeld: "5 days"
  },
  {
    address: "0x34a971ca2fd6da2ce1859671",
    timeHeld: "5 days"
  },
  {
    address: "0x34a971ca2fd6da2ce1859671",
    timeHeld: "5 days"
  },
  {
    address: "0x34a971ca2fd6da2ce1859671",
    timeHeld: "5 days"
  }
];

class LeaderboardSection extends Component {
  constructor(props, context) {
    super();
    this.utils = context.drizzle.web3.utils;
    this.contracts = context.drizzle.contracts;
    this.state = {};
  }

  async componentWillUpdate(nextProps, nextState) {}

  render() {
    return (
      <>
        <h5 className="mb-4">Leaderboard</h5>
        {window.ethereum !== undefined ? (
          <>
            <Row>
              <h4 className="d-block mx-auto mb-4">
                Total time held: <span className="text-primary">365 days</span>
              </h4>
            </Row>
            <Row className="w-75 w-75-off mx-auto">
              {leaderboardData.map((data, index) => {
                return (
                  <Col sm={6} key={index}>
                    <p>
                      {data.address}:{" "}
                      <span className="text-primary">{data.timeHeld}</span>
                    </p>
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          <>
            [In order to buy a token you need to have a web3/Ethereum-enabled
            browser. Please download the{" "}
            <a href="https://metamask.io">MetaMask Chrome extension</a> or open
            in an Ethereum mobile browser.]
          </>
        )}
      </>
    );
  }
}

LeaderboardSection.contextTypes = {
  drizzle: PropTypes.object
};

LeaderboardSection.propTypes = {};

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

export default drizzleConnect(LeaderboardSection, mapStateToProps);
