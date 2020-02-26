export const approveTransaction = (context, value) => {
  const contract = "Cash";
  const method = "approve";

  const contracts = context.drizzle.contracts;
  const utils = context.drizzle.web3.utils;

  const abi = contracts[contract].abi;

  let state = {};
  let sendArgs = {};

  let inputs = [];
  for (let i = 0; i < abi.length; i++) {
    if (abi[i].name === method) {
      inputs = abi[i].inputs;

      for (let j = 0; j < inputs.length; j++) {
        state[inputs[j].name] = "";
      }

      break;
    }
  }

  const convertedInputs = inputs.map((input, index) => {
    if (input.name == "_spender") {
      return contracts.Harber.address;
    }
    if (input.name == "_amount") {
      const valueToApprove = new utils.BN(
        utils.toWei(value.toString(), "ether")
      );
      return valueToApprove;
    } else if (input.type === "bytes32") {
      return utils.toHex(state[input.name]);
    } else if (input.type === "uint256") {
      return utils.toWei(state[input.name], "ether");
    }
    return state[input.name];
  });

  if (state.value) {
    sendArgs.value = utils.toWei(state.value, "ether");
  }
  if (sendArgs) {
    return contracts[contract].methods[method].cacheSend(
      ...convertedInputs,
      sendArgs
    );
  }

  return contracts[contract].methods[method].cacheSend(...convertedInputs);
};