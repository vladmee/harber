import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import toEth from "../../utils/toEth";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

const DaiBalanceSection = (props) => {
  const { drizzle } = useDrizzle();
  const { drizzleState, currentUser } = useDrizzleState((drizzleState) => ({
    drizzleState: drizzleState,
    currentUser: drizzleState.accounts[0],
  }));

  return (
    <>
      <p>
        Current Dai Balance:{" "}
        <span className="text-primary">
          <ContractData
            contract="Cash"
            method="balanceOf"
            methodArgs={[currentUser]}
            drizzle={drizzle}
            drizzleState={drizzleState}
            render={(balance) => toEth(balance, drizzle)}
          />
        </span>{" "}
        DAI
      </p>
    </>
  );
};

export default DaiBalanceSection;
