import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { approveTransaction } from "./ApproveService";

import Input from "../common/Input";
import { Button, Col } from "react-bootstrap";

// todo: show ux when transacted
var url_string = window.location.href;
var url = new URL(url_string);
var urlId = url.searchParams.get("id");

class ContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.context = context;
    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = "";
        }

        break;
      }
    }

    this.state = initialState;
  }

  async handleSubmit(event) {
    event.preventDefault();

    await this.doSubmit();
    if (this.props.method === "depositDai") {
      await approveTransaction(this.context, this.state["_dai"]);
    }
  }

  doSubmit() {
    let args = this.props.sendArgs;
    const convertedInputs = this.inputs.map((input, index) => {
      // console.log(this.state[input.name]);
      if (input.name === "_tokenId") {
        return urlId;
      }
      if (input.name === "_amount") {
        return 100000000000000000000;
      } else if (input.type === "bytes32") {
        return this.utils.toHex(this.state[input.name]);
      } else if (input.type === "uint256") {
        return this.utils.toWei(this.state[input.name], "ether"); // all number fields are ETH  fields.
      }
      return this.state[input.name];
    });

    if (this.state.value) {
      args.value = this.utils.toWei(this.state.value, "ether");
    }
    if (args) {
      return this.contracts[this.props.contract].methods[
        this.props.method
      ].cacheSend(...convertedInputs, args);
    }

    return this.contracts[this.props.contract].methods[
      this.props.method
    ].cacheSend(...convertedInputs);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch (true) {
      case /^uint/.test(type):
        return "number";
      case /^string/.test(type) || /^bytes/.test(type):
        return "text";
      case /^bool/.test(type):
        return "checkbox";
      default:
        return "text";
    }
  }

  render() {
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        {this.inputs.map((input, index) => {
          var inputType = this.translateType(input.type);
          var inputLabel = this.props.labels
            ? this.props.labels[index]
            : input.name;
          // check if input type is struct and if so loop out struct fields as well

          if (input.name !== "_tokenId" && input.name !== "_amount") {
            // console.log(input.name);
            return (
              <Col sm={6} key={input.name}>
                <Input
                  label={"DAI"}
                  type={inputType}
                  name={input.name}
                  value={this.state[input.name]}
                  placeholder={inputLabel}
                  onChange={this.handleInputChange}
                />
              </Col>
            );
          }
        })}
        <Col
          sm={this.props.onlyButton ? 12 : 6}
          className={this.props.onlyButton ? "text-center" : "text-left"}
        >
          <Button
            variant="dark"
            key="submit"
            type="button"
            className="text-uppercase"
            onClick={this.handleSubmit}
          >
            {this.props.buttonText}
          </Button>
        </Col>
      </form>
    );
  }
}

ContractForm.contextTypes = {
  drizzle: PropTypes.object
};

ContractForm.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  sendArgs: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.string)
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  };
};

export default drizzleConnect(ContractForm, mapStateToProps);
