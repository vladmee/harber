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

  const tokenId = useSelector((state) => state.status.currentToken);

  const noErrors = {
    _newPrice: null,
    _dai: null,
    _daiToWithdraw: null,
  };
  const [inputErrors, setInputErrors] = useState(noErrors);

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
                className="mx-auto"
                //onSubmit={(e) => handleRent(e, state, handleSubmit)}
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
                className="mx-auto"
                //onSubmit={(e) => handleRent(e, state, handleSubmit)}
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
                className="mx-auto"
                //onSubmit={(e) => handleRent(e, state, handleSubmit)}
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
                className="mx-auto"
                //onSubmit={(e) => handleRent(e, state, handleSubmit)}
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
