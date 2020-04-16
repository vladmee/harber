import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { useSelector } from "react-redux";

import Input from "../common/Input";
import { Button } from "react-bootstrap";

import { approveTransaction } from "./ApproveService";

/*
Edited from drizzle react components, ContractFrom.
Overkill. Needs to be refactored to smaller scope.
*/

var url_string = window.location.href;
var url = new URL(url_string);
var urlId = url.searchParams.get("id");

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const BuyForm = props => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  const urlId = useSelector(state => state.status.currentToken);
  const currentTx = useSelector(state => state.status.currentTx);
  const currentTxStatus = useSelector(state => state.status.currentTx.status);

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

  const [waitApproval, setWaitApproval] = useState(false);

  const [tokenPriceKey, setTokenPriceKey] = useState(
    contracts.Harber.methods.price.cacheCall(urlId)
  );

  useEffect(() => {
    if (waitApproval && currentTxStatus === "SUCCESSFUL") {
      setWaitApproval(false);
      doSubmit();
    }
  }, [waitApproval, currentTxStatus]);

  const handleSubmit = async event => {
    event.preventDefault();

    setInputValues({
      ...inputValues,
      _newPriceError: null,
      _depositError: null
    });

    if (!inputValues["_newPrice"]) {
      setInputValues({
        ...inputValues,
        _newPriceError: "Please insert a rental price"
      });
      return;
    }

    if (!inputValues["_deposit"]) {
      setInputValues({
        ...inputValues,
        _depositError: "Please insert the deposit amount"
      });
      return;
    }

    const getCurrentPrice = await contractsState["Harber"]["price"][
      tokenPriceKey
    ].value;
    const getNewPrice = await utils.toWei(inputValues["_newPrice"], "ether");

    const currentPrice = Number(getCurrentPrice);
    const newPrice = Number(getNewPrice);

    if (newPrice < currentPrice + currentPrice / 10) {
      setInputValues({
        ...inputValues,
        _newPriceError:
          "The new price should be at least 10% higher than the current price"
      });
      return;
    }

    const getDeposit = await utils.toWei(inputValues["_deposit"], "ether");

    const deposit = Number(getDeposit);

    if (deposit < newPrice / 24) {
      setInputValues({
        ...inputValues,
        _depositError:
          "The deposit amount must be enough for at least one hour's rent"
      });
      return;
    }

    approveTransaction(drizzle, inputValues["_deposit"]).then(
      setWaitApproval(true)
    );
  };

  const doSubmit = () => {
    let args = props.sendArgs;
    //// args is the msg.value!!! It is NOT either of the two fields
    //// console.log("args is", args);
    //// we know what this.inputs is from above- it is the inputs newprice and tokenId from the abi

    //// the below function gets the relevant data that is required to interact with the function. So after this, we get convertedinputs[0] = newprice, and [1] = tokenId. Note that at this point we still havnt got the deposit amount. This is fine as we don't need it as an argument, however we do need it to form the value of the tx.

    // console.log("events is", event);
    // console.log("this.state is", this.state);
    const convertedInputs = inputs.map((input, index) => {
      if (input.name === "_tokenId") {
        return urlId;
      } else if (input.type === "bytes32") {
        //// this elseif is not used as thre are no bytes32 inputs
        return utils.toHex(inputValues[input.name]);
      } else if (input.type === "uint256") {
        // console.log("pls",this.state[input.name]);
        return utils.toWei(inputValues[input.name], "ether"); // all number fields are ETH  fields.
      }
      return inputValues[input.name];
    });
    // console.log("convertedinputs is", convertedInputs);

    //// this.state.value = the deposit amount
    // console.log("state.value is ", this.state.value);
    if (inputValues.value) {
      //// so the below gets the existing price, and then converts it to bignumber format
      // console.log("thingy is ",this.props.contracts[this.props.contract]['price'][this.state.tokenPriceKey].value);
      // const artworkPrice = new this.utils.BN(
      //   this.props.contracts[this.props.contract]["price"][
      //     this.state.tokenPriceKey
      //   ].value
      // );
      // console.log("artwork price is", artworkPrice);

      ////originally, the amount payable was current price + deposit, this is now changed to just the deposit.
      // args.value = new this.utils.BN(this.utils.toWei(this.state.value, 'ether')).add(artworkPrice);
      args.value = new utils.BN(utils.toWei(inputValues.value, "ether"));
      // console.log("args.value is" , args.value );
      // console.log("value thingy is", this.utils.toWei(this.state.value, 'ether'));
    }
    if (Object.keys(args).length !== 0 && args.constructor !== Object) {
      // console.log("args is: ", args);

      ////so heres the thing. convertedinputs is the arguments to send to the function. Args = the amount payable. It does this bit if there is value being sent
      // console.log("convertedInputs is ", convertedInputs);
      return contracts[props.contract].methods[props.method].cacheSend(
        ...convertedInputs,
        args
      );
    }

    ////it does this if is no value being sent, so in reality this is not used.
    return contracts[props.contract].methods[props.method].cacheSend(
      ...convertedInputs
    );
  };

  const handleInputChange = event => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    });
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

  const valueLabel = props.valueLabel;

  return (
    <form
      className="pure-form pure-form-stacked w-50 mx-auto"
      onSubmit={handleSubmit}
    >
      {inputs.map((input, index) => {
        var inputType = translateType(input.type);
        var inputLabel = props.labels ? props.labels[index] : input.name;
        // check if input type is struct and if so loop out struct fields as well
        // console.log(input);
        //this is another hack as Im not sure what is going on
        if (input.name === "_newPrice") {
          return (
            <Input
              label={"DAI"}
              key={input.name}
              type={inputType}
              name={input.name}
              value={inputValues[input.name]}
              placeholder={inputLabel}
              onChange={handleInputChange}
              error={inputValues["_newPriceError"]}
            />
          );
        }

        // if (input.name == "_deposit")
        // {
        //   return (

        //     // <Input
        //       // key={input.name}
        //       // type={inputType}
        //       // name={input.name}
        //       // value={this.state[input.name]}
        //       // placeholder={inputLabel}
        //       // onChange={this.handleInputChange}
        //       // startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
        //     // />
        //   );
        // }
      })}
      {valueLabel && (
        <Input
          label={"DAI"}
          key={valueLabel}
          type="number"
          name="_deposit"
          value={inputValues[valueLabel]}
          placeholder={valueLabel}
          onChange={handleInputChange}
          error={inputValues["_depositError"]}
        />
      )}
      <Button
        variant="dark"
        key="submit"
        type="button"
        className="text-uppercase"
        onClick={handleSubmit}
      >
        Rent Token
      </Button>
    </form>
  );
};

export default BuyForm;
