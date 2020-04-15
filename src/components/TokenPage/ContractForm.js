import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { approveTransaction } from "./ApproveService";

import Input from "../common/Input";
import { Button, Col } from "react-bootstrap";

// todo: show ux when transacted
var url_string = window.location.href;
var url = new URL(url_string);
var urlId = url.searchParams.get("id");

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const ContractForm = props => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;
  const contractsState = state.contracts;

  const abi = contracts[props.contract].abi;
  let inputsArray = [];
  let initialInputs = {
    _newPriceError: null,
    _depositError: null
  };
  // Iterate over abi for correct function.
  for (let i = 0; i < abi.length; i++) {
    if (abi[i].name === props.method) {
      inputsArray = abi[i].inputs;

      for (let j = 0; j < inputsArray.length; j++) {
        initialInputs[inputsArray[j].name] = "";
      }
      break;
    }
  }
  const [inputs, setInputs] = useState(inputsArray);
  const [inputValues, setInputValues] = useState(initialInputs);

  const handleSubmit = async event => {
    event.preventDefault();

    await doSubmit();
    if (props.method === "depositDai") {
      await approveTransaction(inputValues["_dai"]);
    }
  };

  const doSubmit = () => {
    let args = props.sendArgs;
    const convertedInputs = inputs.map((input, index) => {
      // console.log(this.state[input.name]);
      if (input.name === "_tokenId") {
        return urlId;
      }
      if (input.name === "_amount") {
        return 100000000000000000000;
      } else if (input.type === "bytes32") {
        return utils.toHex(inputValues[input.name]);
      } else if (input.type === "uint256") {
        return utils.toWei(inputValues[input.name], "ether"); // all number fields are ETH  fields.
      }
      return inputValues[input.name];
    });

    if (inputValues.value) {
      args.value = utils.toWei(inputValues.value, "ether");
    }
    if (args) {
      return contracts[props.contract].methods[props.method].cacheSend(
        ...convertedInputs,
        args
      );
    }

    return contracts[props.contract].methods[props.method].cacheSend(
      ...convertedInputs
    );
  };

  const handleInputChange = event => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const translateType = type => {
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
  };
  return (
    <form className="row" onSubmit={handleSubmit}>
      {inputs.map((input, index) => {
        var inputType = translateType(input.type);
        var inputLabel = props.labels ? props.labels[index] : input.name;
        // check if input type is struct and if so loop out struct fields as well

        if (input.name !== "_tokenId" && input.name !== "_amount") {
          // console.log(input.name);
          return (
            <Col sm={6} key={input.name}>
              <Input
                label={"DAI"}
                type={inputType}
                name={input.name}
                value={inputValues[input.name]}
                placeholder={inputLabel}
                onChange={handleInputChange}
              />
            </Col>
          );
        }
      })}
      <Col
        sm={props.onlyButton ? 12 : 6}
        className={props.onlyButton ? "text-center" : "text-left"}
      >
        <Button
          variant="dark"
          key="submit"
          type="button"
          className="text-uppercase"
          onClick={handleSubmit}
        >
          {props.buttonText}
        </Button>
      </Col>
    </form>
  );
};

export default ContractForm;
