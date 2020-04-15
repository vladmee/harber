import React, { useState, useEffect, useRef } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import ContractData from "../ContractData";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const DaiBalanceSection = props => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;
  const contractsState = state.contracts;
  const address = drizzle.web3.givenProvider.selectedAddress;

  const [USD, setUSD] = useState(-1);
  const [daiBalanceKey, setDaiBalanceKey] = useState(
    drizzle.contracts.Cash.methods.balanceOf.cacheCall(address)
  );
  const [daiBalance, setDaiBalance] = useState(-1);
  const [patron, setPatron] = useState(null);

  const updateDaiBalance = async () => {
    const daiBalance = await getBalanceOf();
    setDaiBalance(daiBalance);
  };

  const getBalanceOf = () => {
    return contractsState["Cash"]["balanceOf"][daiBalanceKey].value;
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (daiBalanceKey in contractsState["Cash"]["balanceOf"]) {
      updateDaiBalance();
    }
  });

  return (
    <>
      <p>
        Current Dai Balance:{" "}
        <span className="text-primary">
          <ContractData
            contract="Cash"
            method="balanceOf"
            methodArgs={[address]}
            toEth
          />
        </span>{" "}
        DAI
      </p>
      {/* <h2>Your Dai Balance: {this.state.daiBalance}   </h2> */}
    </>
  );
};

export default DaiBalanceSection;
