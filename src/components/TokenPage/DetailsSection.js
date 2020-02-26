import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Moment from "react-moment";
import ContractData from "../ContractData";
import { roundTwoDecimals } from "../common/Helpers";

var url_string = window.location.href;
var url = new URL(url_string);
var urlId = url.searchParams.get("id");

class DetailsSection extends Component {
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
        {/* <p>Address: <ContractData contract="ERC721Full" method="ownerOf" methodArgs={[urlId]}/></p> */}
        <p className="mb-1">Current Owners' Remaining deposit:</p>
        <p>
          <span className="text-primary">
            <ContractData
              contract="Harber"
              method="liveDepositAbleToWithdraw"
              methodArgs={[urlId]}
              toEth
            />
          </span>{" "}
          DAI
        </p>

        <p className="mb-1">Your Remaining Deposit:</p>
        <p>
          <span className="text-primary">
            <ContractData
              contract="Harber"
              method="userDepositAbleToWithdraw"
              methodArgs={[urlId]}
              toEth
            />
          </span>{" "}
          DAI
        </p>

        <p className="mb-1">Rental Expiry Time:</p>
        <p>
          <span className="text-primary">
            <Moment toNow>{this.state.rentalExpiryTime}</Moment>
          </span>
        </p>

        <p className="mb-1">Total Rent Collected:</p>
        <p>
          <span className="text-primary">
            {roundTwoDecimals(this.state.combinedCollectedToken)}
          </span>{" "}
          DAI
        </p>
      </div>
    );
  }
}

DetailsSection.contextTypes = {
  drizzle: PropTypes.object
};

DetailsSection.propTypes = {};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  };
};

export default drizzleConnect(DetailsSection, mapStateToProps);
