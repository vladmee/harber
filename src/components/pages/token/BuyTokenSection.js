import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import DaiBalanceSection from "./DaiBalanceSection";
import TestDaiFaucetSection from "../../common/TestDaiFaucetSection";

import Input from "../../common/Input";
import { Button } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

const BuyTokenSection = () => {
  const { drizzle, useCacheCall, useCacheSend } = useDrizzle();
  const { drizzleState, currentUser } = useDrizzleState((drizzleState) => ({
    drizzleState: drizzleState,
    currentUser: drizzleState.accounts[0],
  }));

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;

  const tokenId = useSelector((state) => state.status.currentToken);

  const tokenPrice = useCacheCall("RealityCards", "price", [tokenId]);
  const currentAllowance = useCacheCall(
    "Cash",
    "allowance",
    currentUser,
    contracts.Cash.address
  );
  const approve = useCacheSend("Cash", "approve");

  const noErrors = {
    _newPrice: null,
    _deposit: null,
  };
  const [inputErrors, setInputErrors] = useState(noErrors);
  const [waitApproval, setWaitApproval] = useState(false);
  const [submitFunction, setSubmitFunction] = useState(null);

  useEffect(() => {
    if (waitApproval && approve.status === "success") {
      setWaitApproval(false);
      submitFunction.handleSubmit(submitFunction.e);
    }
  }, [waitApproval, approve]);

  const handleRent = async (e, state, handleSubmit) => {
    console.log(e);
    e.preventDefault();
    e.persist();
    setSubmitFunction({
      e: e,
      handleSubmit: handleSubmit,
    });
    setInputErrors({ ...noErrors });

    if (!state["_newPrice"]) {
      setInputErrors({
        ...inputErrors,
        _newPrice: "Please insert a rental price",
      });
      return;
    }

    if (!state["_deposit"]) {
      setInputErrors({
        ...inputErrors,
        _deposit: "Please insert the deposit amount",
      });
      return;
    }

    const newPriceWei = await utils.toWei(state["_newPrice"], "ether");

    const currentPrice = Number(tokenPrice);
    const newPrice = Number(newPriceWei);

    if (newPrice < currentPrice + currentPrice / 10) {
      setInputErrors({
        ...inputErrors,
        _newPrice:
          "The new price should be at least 10% higher than the current price",
      });
      return;
    }

    const depositWei = await utils.toWei(state["_deposit"], "ether");

    const deposit = Number(depositWei);

    if (deposit < newPrice / 24) {
      setInputErrors({
        ...inputErrors,
        _deposit:
          "The deposit amount must be enough for at least one hour's rent",
      });
      return;
    }

    if (Number(currentAllowance) >= deposit) {
      handleSubmit(e);
    } else {
      const amountToApprove = "1000000000000000000000"; //$1000 in DAI
      approve.send(contracts.Cash.address, amountToApprove);
      setWaitApproval(true);
    }
  };

  return (
    <>
      <h5 className="mb-4">Rent Team</h5>
      <DaiBalanceSection />

      <div className="mb-3">
        <TestDaiFaucetSection />
      </div>

      <ContractForm
        contract="RealityCards"
        method="newRental"
        drizzle={drizzle}
        drizzleState={drizzleState}
        render={({ state, handleInputChange, handleSubmit }) => {
          state._tokenId = tokenId;
          return (
            <form
              className="w-50 mx-auto"
              onSubmit={(e) => handleRent(e, state, handleSubmit)}
            >
              <Input
                label="DAI"
                type="number"
                name="_newPrice"
                placeholder="New Rental Price"
                onChange={handleInputChange}
                error={inputErrors["_newPrice"]}
                className="mb-3"
              />
              <Input
                label={"DAI"}
                type="number"
                name="_deposit"
                placeholder="Your Initial Deposit"
                onChange={handleInputChange}
                error={inputErrors["_deposit"]}
                className="mb-3"
              />
              <Button variant="dark" type="submit" className="text-uppercase">
                Rent Token
              </Button>
            </form>
          );
        }}
      />
    </>
  );
};

export default BuyTokenSection;
