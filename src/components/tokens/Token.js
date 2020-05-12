import React, { useState, useEffect, useRef } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import moment from "moment";
import toEth from "../utils/toEth";
import roundTwoDecimals from "../utils/roundTwoDecimals";

import { Image } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

const Token = ({ token, sumOfAllPrices }) => {
  const tokenId = token.id;
  const { drizzle, useCacheCall } = useDrizzle();

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;
  const {
    drizzleState,
    currentUser,
    RealityCards,
    ERC721Full,
  } = useDrizzleState((drizzleState) => ({
    drizzleState: drizzleState,
    currentUser: drizzleState.accounts[0],
    RealityCards: drizzleState.contracts.RealityCards,
    ERC721Full: drizzleState.contracts.ERC721Full,
  }));

  const [owner, setOwner] = useState(null);
  const [timeHeldKey, setTimeHeldKey] = useState(null);
  const [currentTimeHeldHumanized, setCurrentTimeHeldHumanized] = useState("");
  const [impliedOdds, setImpliedOdds] = useState(null);

  const tokenPrice = useCacheCall("RealityCards", "price", [tokenId]);
  const ownerAddress = useCacheCall("ERC721Full", "ownerOf", [tokenId]);
  const timeLastCollected = useCacheCall("RealityCards", "timeLastCollected", [
    tokenId,
  ]);

  console.log(tokenPrice, ownerAddress, timeLastCollected);

  useEffect(() => {
    if (ownerAddress) {
      updateOwner();
    }
  }, [ownerAddress]);

  useEffect(() => {
    if (timeHeldKey) {
      updateTimeHeld();
    }
  }, [timeHeldKey, RealityCards["timeHeld"]]);

  useEffect(() => {
    if (impliedOdds === null && sumOfAllPrices !== 0 && tokenPrice) {
      updateImpliedOdds();
    }
  }, [impliedOdds, sumOfAllPrices, tokenPrice]);

  const updateOwner = async () => {
    if (ownerAddress === contracts.RealityCards.address) {
      setOwner("unowned");
      return;
    } else if (ownerAddress === currentUser) {
      setOwner("you");
    } else {
      setOwner(ownerAddress);
    }

    const timeHeldKey = await contracts.RealityCards.methods.timeHeld.cacheCall(
      tokenId,
      ownerAddress
    );
    setTimeHeldKey(timeHeldKey);
  };

  const updateTimeHeld = async () => {
    const date = new Date();
    let timeHeld = null;

    if (timeHeldKey in RealityCards["timeHeld"]) {
      timeHeld = RealityCards["timeHeld"][timeHeldKey].value;
    } else {
      return;
    }

    const currentTimeHeld =
      parseInt(timeHeld) +
      (parseInt(date.getTime() / 1000) - parseInt(timeLastCollected));

    const currentTimeHeldHumanized = moment
      .duration(currentTimeHeld, "seconds")
      .humanize();

    setCurrentTimeHeldHumanized(currentTimeHeldHumanized);
  };

  const updateImpliedOdds = async () => {
    const priceEth = await utils.fromWei(tokenPrice, "ether");
    const odds = (priceEth / sumOfAllPrices) * 100;

    setImpliedOdds(odds);
  };

  return (
    <>
      <h5>Daily rental price</h5>
      <h3 className="text-primary">
        $
        <ContractData
          contract="RealityCards"
          method="price"
          methodArgs={[tokenId]}
          drizzle={drizzle}
          drizzleState={drizzleState}
          render={(amount) => toEth(amount, drizzle)}
        />
      </h3>
      <p>
        {impliedOdds !== null && !isNaN(impliedOdds) ? (
          <>Implied odds: {roundTwoDecimals(impliedOdds)}%</>
        ) : null}
      </p>
      <Image
        src={window.location.origin + "/logos/" + token.image}
        alt={token.name}
        height={130}
        className="logo-image mb-3"
      />
      <h5>{token.name}</h5>
      <p className="mb-1">Current owner:</p>
      <p className="small">{owner}</p>
      <p className="mb-0">
        {currentTimeHeldHumanized ? (
          <>Owned for {currentTimeHeldHumanized}</>
        ) : (
          <> </>
        )}
      </p>
    </>
  );
};

export default Token;
