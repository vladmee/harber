import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import moment from "moment";
import Moment from "react-moment";
import toEth from "../../utils/toEth";
import roundTwoDecimals from "../../utils/roundTwoDecimals";
import addBN from "../../utils/addBN";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

const DetailsSection = () => {
  const { drizzle, useCacheCall } = useDrizzle();
  const { drizzleState, RealityCards } = useDrizzleState((drizzleState) => ({
    drizzleState: drizzleState,
    RealityCards: drizzleState.contracts.RealityCards,
  }));
  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;

  const tokenId = useSelector((state) => state.status.currentToken);

  const tokenPrice = useCacheCall("RealityCards", "price", [tokenId]);
  const rentOwed = useCacheCall("RealityCards", "rentOwed", [tokenId]);
  const collectedPerToken = useCacheCall("RealityCards", "collectedPerToken", [
    tokenId,
  ]);

  const [combinedCollectedToken, setCombinedCollectedToken] = useState(
    "Fetching..."
  );
  const [rentalExpiryTime, setRentalExpiryTime] = useState("Fetching...");

  useEffect(() => {
    if (tokenPrice === "0") {
      setRentalExpiryTime("N/A");
    } else {
      updateRentalExpiryTime();
    }
  }, [tokenPrice]);

  useEffect(() => {
    if (
      combinedCollectedToken === "Fetching..." &&
      collectedPerToken &&
      rentOwed
    ) {
      updateCombineCollectedToken();
    }
  }, [collectedPerToken, rentOwed, combinedCollectedToken]);

  const updateRentalExpiryTime = async () => {
    const rentalExpiryTime = await contracts.RealityCards.methods
      .rentalExpiryTime(tokenId)
      .call();

    const actualRentalExpiryTime = moment(parseInt(rentalExpiryTime) * 1000);

    if (actualRentalExpiryTime.isBefore(moment())) {
      setRentalExpiryTime("expired");
    } else {
      setRentalExpiryTime(actualRentalExpiryTime);
    }
  };

  const updateCombineCollectedToken = async () => {
    const combined = addBN(collectedPerToken, rentOwed);
    const combinedCollectedToken = utils.fromWei(combined, "ether").toString();
    setCombinedCollectedToken(combinedCollectedToken);
  };

  return (
    <div>
      <p className="mb-1">Current Owners' Remaining deposit:</p>
      <p>
        <span className="text-primary">
          <ContractData
            contract="RealityCards"
            method="currentOwnerRemainingDeposit"
            methodArgs={[tokenId]}
            drizzle={drizzle}
            drizzleState={drizzleState}
            render={(value) => toEth(value, drizzle)}
          />
        </span>{" "}
        DAI
      </p>

      <p className="mb-1">Your Remaining Deposit:</p>
      <p>
        <span className="text-primary">
          <ContractData
            contract="RealityCards"
            method="userRemainingDeposit"
            methodArgs={[tokenId]}
            drizzle={drizzle}
            drizzleState={drizzleState}
            render={(value) => toEth(value, drizzle)}
          />
        </span>{" "}
        DAI
      </p>

      <p className="mb-1">Rental Expiry Time:</p>
      <p>
        <span className="text-primary">
          {rentalExpiryTime !== "expired" ? (
            <Moment fromNow>{rentalExpiryTime}</Moment>
          ) : (
            <>expired</>
          )}
        </span>
      </p>

      <p className="mb-1">Total Rent Collected:</p>
      <p>
        <span className="text-primary">
          {roundTwoDecimals(combinedCollectedToken)}
        </span>{" "}
        DAI
      </p>
    </div>
  );
};

export default DetailsSection;
