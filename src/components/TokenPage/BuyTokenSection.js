import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import BuyForm from "./BuyForm";
import DaiBalanceSection from "./DaiBalanceSection";

class BuyTokenSection extends Component {
  render() {
    return (
      <Fragment>
        <h5 className="mb-4">Rent Team</h5>
        {window.ethereum !== undefined ? (
          <Fragment>
            {/* <p>You will pay <ContractData contract="Harber" method="price(0)" toEth/> ETH.<br /> Add your own sale price and amount you want to deposit for patronage: </p> */}
            <DaiBalanceSection />
            <BuyForm
              contract="Harber"
              method="newRental"
              labels={["New Rental Price"]}
              valueLabel="Your Initial Deposit"
              sendArgs={{}}
            />
          </Fragment>
        ) : (
          <Fragment>
            [In order to buy a token you need to have a web3/Ethereum-enabled
            browser. Please download the{" "}
            <a href="https://metamask.io">MetaMask Chrome extension</a> or open
            in an Ethereum mobile browser.]
          </Fragment>
        )}
      </Fragment>
    );
  }
}

BuyTokenSection.contextTypes = {
  drizzle: PropTypes.object
};

BuyTokenSection.propTypes = {};

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

export default drizzleConnect(BuyTokenSection, mapStateToProps);
