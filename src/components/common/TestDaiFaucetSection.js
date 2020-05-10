import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import { Button } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

const TestDaiFaucetSection = (props) => {
  const { drizzle } = useDrizzle();
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);

  return (
    <div className="section" style={{ margin: "0px" }}>
      <ContractForm
        contract="Cash"
        method="faucet"
        drizzle={drizzle}
        drizzleState={drizzleState}
        render={({ state, handleSubmit }) => {
          state._amount = String(100000000000000000000);
          return (
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
              <Button variant="dark" type="submit" className="text-uppercase">
                Get $100 test DAI
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default TestDaiFaucetSection;
