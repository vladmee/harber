import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import ContractForm from "../TokenPage/ContractForm";

var url_string = window.location.href;
var url = new URL(url_string);
var urlId = url.searchParams.get("id");

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const TestDaiFaucetSection = props => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;
  const contractsState = state.contracts;

  // const [tokenPriceKey, setTokenPriceKey] = useState(
  //   contracts.Harber.methods.price.cacheCall(urlId)
  // );
  // const [rentOwedKey, setRentOwedKey] = useState(
  //   contracts.Harber.methods.rentOwed.cacheCall(urlId)
  // );
  // const [totalCollectedKey, setTotalCollectedKey] = useState(
  //   contracts.Harber.methods.totalCollected.cacheCall()
  // );
  // const [rentOwed, setRentOwed] = useState(-1);
  // const [combinedCollected, setCombinedCollected] = useState(-1);
  // const [foreclosureTime, setForeclosureTime] = useState("N/A");

  return (
    <div className="section" style={{ margin: "0px" }}>
      {window.ethereum !== undefined ? (
        <>
          {/* <ContractForm buttonText="Get $100 test DAI" contract="Harber" method="getTestDai" /> */}
          {/* <ContractForm buttonText="Get $100 test DAI" contract="Cash" method="faucet"  labels={["Faucet request"]} /> */}
          <ContractForm
            buttonText="Get $100 test DAI"
            contract="Cash"
            method="faucet"
            onlyButton
          />
        </>
      ) : (
        <>
          In order to interact with the artwork you need to have a
          web3/Ethereum-enabled browser. Please download the{" "}
          <a href="https://metamask.io">MetaMask Chrome extension</a> or open in
          an Ethereum mobile browser.
        </>
      )}
    </div>
  );
};

export default TestDaiFaucetSection;
