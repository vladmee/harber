import React, { useState, useEffect, useRef } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import moment from "moment";
import ContractData from "../ContractData";
import { getUSDValue } from "../../Actions";

import { Image } from "react-bootstrap";
import { roundTwoDecimals } from "../common/Helpers";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const PriceSection = (props) => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;
  const contractsState = state.contracts;

  const [USD, setUSD] = useState(-1);
  const [tokenPriceKey, setTokenPriceKey] = useState(
    drizzle.contracts.Harber.methods.price.cacheCall(props.urlId)
  );
  const [patron, setPatron] = useState(null);
  const [patronKey, setPatronKey] = useState(
    drizzle.contracts.ERC721Full.methods.ownerOf.cacheCall(props.urlId)
  );
  const [timeAcquiredKey, setTimeAcquiredKey] = useState(
    drizzle.contracts.Harber.methods.timeAcquired.cacheCall(props.urlId)
  );
  const [timeHeldKey, setTimeHeldKey] = useState(null);
  const [currentTimeHeld, setCurrentTimeHeld] = useState(0);
  const [currentTimeHeldHumanized, setCurrentTimeHeldHumanized] = useState("");
  const [impliedOdds, setImpliedOdds] = useState(null);

  const getArtworkPrice = () => {
    return new utils.BN(contractsState["Harber"]["price"][tokenPriceKey].value);
  };

  const updateUSDPrice = async () => {
    const price = utils.fromWei(getArtworkPrice(), "ether");
    const USD = await getUSDValue(price);
    setUSD(USD);
  };

  const updateTimeHeld = async (timeHeldKey) => {
    const date = new Date();
    let currentTimeHeld =
      parseInt(getTimeHeld(timeHeldKey)) +
      (parseInt(date.getTime() / 1000) - parseInt(getTimeAcquired()));

    var currentTimeHeldHumanized = moment
      .duration(currentTimeHeld, "seconds")
      .humanize();

    if (
      contractsState["ERC721Full"]["ownerOf"][patronKey].value ===
      contracts.Harber.address
    ) {
      currentTimeHeldHumanized = "unowned";
    }

    setCurrentTimeHeld(currentTimeHeld);
    setCurrentTimeHeldHumanized(currentTimeHeldHumanized);
  };

  const updatePatron = async () => {
    let patron = getPatron();
    if (patron === contracts.Harber.address) {
      patron = "unowned";
    }
    // update timeHeldKey IF owner updated
    let timeHeldKey;
    if (patron !== "unowned") {
      timeHeldKey = contracts.Harber.methods.timeHeld.cacheCall(
        props.urlId,
        patron
      );
    }
    setCurrentTimeHeld(0);
    setTimeHeldKey(timeHeldKey);
    setPatron(patron);
  };

  const getPatron = () => {
    return contractsState["ERC721Full"]["ownerOf"][patronKey].value;
  };

  const getTimeAcquired = () => {
    return contractsState["Harber"]["timeAcquired"][timeAcquiredKey].value;
  };

  const getTimeHeld = (timeHeldKey) => {
    return contractsState["Harber"]["timeHeld"][timeHeldKey].value;
  };

  const getImpliedOdds = async () => {
    const price = await utils.fromWei(getArtworkPrice(tokenPriceKey), "ether");

    return (price / props.sumOfAllPrices) * 100;
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (patronKey in contractsState["ERC721Full"]["ownerOf"]) {
      updatePatron();
    }

    /* todo: fetch new exchange rate? */
    if (tokenPriceKey in contractsState["Harber"]["price"]) {
      updateUSDPrice();
    }

    if (timeHeldKey in contractsState["Harber"]["timeHeld"]) {
      updateTimeHeld(timeHeldKey);
    }

    if (
      impliedOdds === null &&
      props.sumOfAllPrices !== 0 &&
      tokenPriceKey in contractsState["Harber"]["price"]
    ) {
      const impliedOdds = getImpliedOdds();
      setImpliedOdds(impliedOdds);
    }
  });

  return (
    <>
      <h5>Daily rental price</h5>
      <h3 className="text-primary">
        $
        <ContractData
          contract="Harber"
          method="price"
          methodArgs={[props.urlId]}
          toEth
        />
      </h3>
      <p>
        {impliedOdds !== null && !isNaN(impliedOdds) ? (
          <>Implied odds: {roundTwoDecimals(impliedOdds)}%</>
        ) : null}
      </p>
      <Image
        src={window.location.origin + "/logos/" + props.image}
        alt={props.name}
        height={130}
        className="logo-image mb-3"
      />
      <h5>{props.name}</h5>
      <p className="mb-1">Current owner:</p>
      <p className="small">{patron}</p>
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

export default PriceSection;
