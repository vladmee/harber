import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import Input from "../../common/Input";
import { Button } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

const ActionSection = () => {
  const { drizzle, useCacheCall, useCacheSend } = useDrizzle();
  const { drizzleState } = useDrizzleState((drizzleState) => ({
    drizzleState: drizzleState,
  }));
  const utils = drizzle.web3.utils;

  const tokenId = useSelector((state) => state.status.currentToken);

  const tokenPrice = useCacheCall("Harber", "price", [tokenId]);
  const depositAbleToWithdraw = useCacheCall(
    "Harber",
    "userDepositAbleToWithdraw",
    [tokenId]
  );

  const noErrors = {
    _newPrice: null,
    _dai: null,
    _daiToWithdraw: null,
  };
  const [inputErrors, setInputErrors] = useState(noErrors);

  const [newRentFunction, setNewRentFunction] = useState(null);
  const [submitNewRent, setSubmitNewRent] = useState(false);

  const [depositFunction, setDepositFunction] = useState(null);
  const [submitDeposit, setSubmitDeposit] = useState(false);

  const handleNewRent = async (e, state, handleSubmit) => {
    e.preventDefault();
    e.persist();
    setNewRentFunction({
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
  };

  const handleDeposit = async (e, state, handleSubmit) => {
    e.preventDefault();
    e.persist();
    setDepositFunction({
      e: e,
      handleSubmit: handleSubmit,
    });
    setInputErrors({ ...noErrors });

    if (!state["_dai"]) {
      setInputErrors({
        ...inputErrors,
        _dai: "Please insert the deposit amount",
      });
      return;
    }
  };

  const handleDepositWithdraw = async (e, state, handleSubmit) => {
    e.preventDefault();
    e.persist();
    setInputErrors({ ...noErrors });

    if (!state["_daiToWithdraw"]) {
      setInputErrors({
        ...inputErrors,
        _daiToWithdraw: "Please insert the amount to withdraw",
      });
      return;
    }

    const depositWithdrawWei = await utils.toWei(
      state["_daiToWithdraw"],
      "ether"
    );

    const depositAble = Number(depositAbleToWithdraw);
    const depositWithdraw = Number(depositWithdrawWei);

    if (depositWithdraw > depositAble) {
      setInputErrors({
        ...inputErrors,
        _daiToWithdraw: "Insufficient funds",
      });
      return;
    }

    handleSubmit(e);
  };

  return (
    <div>
      <h5 className="mb-4">Actions</h5>
      <div className="mb-3">
        <ContractForm
          contract="Harber"
          method="changePrice"
          drizzle={drizzle}
          drizzleState={drizzleState}
          render={({ state, handleInputChange, handleSubmit }) => {
            state._tokenId = tokenId;
            return (
              <form
                className="d-flex flex-row justify-content-between align-items-center mx-auto"
                onSubmit={(e) => handleNewRent(e, state, handleSubmit)}
              >
                <Input
                  label="DAI"
                  type="number"
                  name="_newPrice"
                  placeholder="New Price"
                  onChange={handleInputChange}
                  error={inputErrors["_newPrice"]}
                />
                <Button variant="dark" type="submit" className="text-uppercase">
                  Increase Daily Rental
                </Button>
              </form>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <ContractForm
          contract="Harber"
          method="depositDai"
          drizzle={drizzle}
          drizzleState={drizzleState}
          render={({ state, handleInputChange, handleSubmit }) => {
            state._tokenId = tokenId;
            return (
              <form
                className="d-flex flex-row justify-content-between align-items-center mx-auto"
                onSubmit={(e) => handleDeposit(e, state, handleSubmit)}
              >
                <Input
                  label="DAI"
                  type="number"
                  name="_dai"
                  placeholder="DAI to Deposit"
                  onChange={handleInputChange}
                  error={inputErrors["_dai"]}
                />
                <Button variant="dark" type="submit" className="text-uppercase">
                  Top up Deposit
                </Button>
              </form>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <ContractForm
          contract="Harber"
          method="withdrawDeposit"
          drizzle={drizzle}
          drizzleState={drizzleState}
          render={({ state, handleInputChange, handleSubmit }) => {
            state._tokenId = tokenId;
            return (
              <form
                className="d-flex flex-row justify-content-between align-items-center mx-auto"
                onSubmit={(e) => handleDepositWithdraw(e, state, handleSubmit)}
              >
                <Input
                  label="DAI"
                  type="number"
                  name="_daiToWithdraw"
                  placeholder="DAI to Withdraw"
                  onChange={handleInputChange}
                  error={inputErrors["_daiToWithdraw"]}
                />
                <Button variant="dark" type="submit" className="text-uppercase">
                  Withdraw Deposit
                </Button>
              </form>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <ContractForm
          contract="Harber"
          method="exit"
          drizzle={drizzle}
          drizzleState={drizzleState}
          render={({ state, handleInputChange, handleSubmit }) => {
            state._tokenId = tokenId;
            return (
              <form
                className="d-flex flex-row justify-content-between align-items-center mx-auto"
                onSubmit={handleSubmit}
              >
                <Button variant="dark" type="submit" className="text-uppercase">
                  Withdraw Whole Deposit And transfer token to previous owner
                </Button>
              </form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ActionSection;
