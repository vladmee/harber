import { drizzleConnect } from "drizzle-react";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import ContractForm from "./ContractForm";

var url_string = window.location.href;
var url = new URL(url_string);
var urlId = url.searchParams.get("id");

class ActionSection extends Component {
  constructor(props, context) {
    super();
    this.utils = context.drizzle.web3.utils;
    this.contracts = context.drizzle.contracts;
    this.state = {
      tokenPriceKey: context.drizzle.contracts.Harber.methods.price.cacheCall(
        urlId
      ),
      rentOwedKey: context.drizzle.contracts.Harber.methods.rentOwed.cacheCall(
        urlId
      ),
      totalCollectedKey: context.drizzle.contracts.Harber.methods.totalCollected.cacheCall(),
      tokenCollectedKey: context.drizzle.contracts.Harber.methods.collectedPerUser.cacheCall(
        urlId
      ),
      rentOwed: -1,
      combinedCollected: -1,
      combinedCollectedToken: -1,
      rentalExpiryTime: "N/A"
    };
  }

  getTotalCollected(props) {
    return new this.utils.BN(
      props.contracts["Harber"]["totalCollected"][
        this.state.totalCollectedKey
      ].value
    );
  }

  getTokenCollected(props) {
    return new this.utils.BN(
      props.contracts["Harber"]["collectedPerUser"][
        this.state.tokenCollectedKey
      ].value
    );
  }

  async updateCombineCollected(props) {
    const rentOwed = this.getrentOwed(props);
    const totalCollected = this.getTotalCollected(props);
    const combinedCollected = this.utils
      .fromWei(totalCollected.add(rentOwed), "ether")
      .toString();
    this.setState({
      rentOwed,
      combinedCollected
    });
  }

  async updateCombineCollectedToken(props) {
    const rentOwed = this.getrentOwed(props);
    const tokenCollected = this.getTokenCollected(props);
    const combinedCollectedToken = this.utils
      .fromWei(tokenCollected.add(rentOwed), "ether")
      .toString();
    this.setState({
      rentOwed,
      combinedCollectedToken
    });
  }

  getrentOwed(props) {
    return new this.utils.BN(
      props.contracts["Harber"]["rentOwed"][this.state.rentOwedKey].value
    );
  }

  async componentWillReceiveProps(nextProps) {
    if (
      this.props.contracts["Harber"]["price"][this.state.tokenPriceKey] !==
      nextProps.contracts["Harber"]["price"][this.state.tokenPriceKey]
    ) {
      if (
        nextProps.contracts["Harber"]["price"][this.state.tokenPriceKey]
          .value === "0"
      ) {
        this.setState({
          rentalExpiryTime: "N/A"
        });
      } else {
        const rentalExpiryTime = moment(
          parseInt(
            await this.contracts.Harber.methods.rentalExpiryTime(urlId).call()
          ) * 1000
        ).toString();
        this.setState({ rentalExpiryTime });
      }
    }

    if (
      this.state.rentOwedKey in this.props.contracts["Harber"]["rentOwed"] &&
      this.state.rentOwedKey in nextProps.contracts["Harber"]["rentOwed"] &&
      this.state.totalCollectedKey in
        this.props.contracts["Harber"]["totalCollected"] &&
      this.state.totalCollectedKey in
        nextProps.contracts["Harber"]["totalCollected"]
    ) {
      if (
        !this.getrentOwed(this.props).eq(this.getrentOwed(nextProps)) ||
        this.state.combinedCollected === -1
      ) {
        this.updateCombineCollected(nextProps);
      }
    }

    if (
      this.state.rentOwedKey in this.props.contracts["Harber"]["rentOwed"] &&
      this.state.rentOwedKey in nextProps.contracts["Harber"]["rentOwed"] &&
      this.state.tokenCollectedKey in
        this.props.contracts["Harber"]["collectedPerUser"] &&
      this.state.tokenCollectedKey in
        nextProps.contracts["Harber"]["collectedPerUser"]
    ) {
      if (
        !this.getrentOwed(this.props).eq(this.getrentOwed(nextProps)) ||
        this.state.combinedCollectedToken === -1
      ) {
        this.updateCombineCollectedToken(nextProps);
      }
    }
  }

  render() {
    return (
      <div>
        {/* <p>The current deposit will cover the patronage until the time above. At this time, the smart contract steward takes ownership of the artwork and sets its price back to zero.</p> */}
        {/* <p>Once it crosses this time period, the patron can't top up their deposit anymore and is effectively foreclosed.</p> */}
        <h5>Actions</h5>
        {window.ethereum !== undefined ? (
          <Fragment>
            <ContractForm
              buttonText="Increase Daily Rental"
              contract="Harber"
              method="changePrice"
              labels={["New Price"]}
            />
            <ContractForm
              buttonText="Top up Deposit"
              contract="Harber"
              method="depositDai"
              labels={["DAI to Deposit"]}
            />
            <ContractForm
              buttonText="Withdraw Deposit"
              contract="Harber"
              method="withdrawDeposit"
              labels={["DAI to Withdraw"]}
              toEth
            />
            <ContractForm
              buttonText="Withdraw Whole Deposit And transfer token to previous owner"
              contract="Harber"
              method="exit"
              onlyButton
            />
          </Fragment>
        ) : (
          <Fragment>
            In order to interact with this contract you need to have a
            web3/Ethereum-enabled browser. Please download the{" "}
            <a href="https://metamask.io">MetaMask Chrome extension</a> or open
            in an Ethereum mobile browser.
          </Fragment>
        )}
      </div>
    );
  }
}

ActionSection.contextTypes = {
  drizzle: PropTypes.object
};

ActionSection.propTypes = {};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  };
};

export default drizzleConnect(ActionSection, mapStateToProps);
