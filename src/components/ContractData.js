import React, { useState, useEffect, useRef } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import moment from "moment";

import { roundTwoDecimals } from "./common/Helpers";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const ContractData = props => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  const methodArgs = props.methodArgs ? props.methodArgs : [];

  const contracts = drizzle.contracts;
  const contractsState = state.contracts;

  const [dataKey, setDataKey] = useState(
    contracts[props.contract].methods[props.method].cacheCall(...methodArgs)
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setDataKey(
      contracts[props.contract].methods[props.method].cacheCall(
        ...props.methodArgs
      )
    );
  });

  if (!contractsState[props.contract].initialized) {
    return <span>Initializing...</span>;
  }

  if (!(dataKey in contractsState[props.contract][props.method])) {
    return <span>Fetching...</span>;
  }

  // Show a loading spinner for future updates.
  const pendingSpinner = contractsState[props.contract].synced ? "" : "";

  // Optionally hide loading spinner (EX: ERC20 token symbol).
  if (props.hideIndicator) {
    pendingSpinner = "";
  }

  let displayData = contractsState[props.contract][props.method][dataKey].value;

  // Optionally convert to UTF8
  if (props.toUtf8) {
    displayData = drizzle.web3.utils.hexToUtf8(displayData);
  }

  // Optionally convert to Ascii
  if (props.toAscii) {
    displayData = drizzle.web3.utils.hexToAscii(displayData);
  }

  // Optionally convert wei to ETH
  if (props.toEth) {
    displayData = drizzle.web3.utils.fromWei(displayData, "ether");
  }

  if (props.toDate) {
    displayData = moment(parseInt(displayData) * 1000).toString();
  }

  // If return value is an array
  if (Array.isArray(displayData)) {
    const displayListItems = displayData.map((datum, index) => {
      return (
        <li key={index}>
          {`${datum}`}
          {pendingSpinner}
        </li>
      );
    });

    return <ul>{displayListItems}</ul>;
  }

  // If retun value is an object
  if (typeof displayData === "object") {
    var i = 0;
    const displayObjectProps = [];

    Object.keys(displayData).forEach(key => {
      if (i !== key) {
        displayObjectProps.push(
          <li key={i}>
            <strong>{key}</strong>
            {pendingSpinner}
            <br />
            {`${displayData[key]}`}
          </li>
        );
      }

      i++;
    });

    return <ul>{displayObjectProps}</ul>;
  }

  return (
    <span>
      {`${roundTwoDecimals(displayData)}`}
      {pendingSpinner}
    </span>
  );
};

export default ContractData;
