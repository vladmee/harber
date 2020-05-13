import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import Token from "../../tokens/Token";

import { tokens } from "../../tokens/premier-league";
import { history } from "../../../store";
import { setCurrentToken } from "../../../store/actions/status";

import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { ReactComponent as Wave } from "../../../assets/dividers/wave.svg";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const AllTokens = (props) => {
  const { drizzle } = useDrizzle();
  const { initialized, Harber } = useDrizzleState((drizzleState) => ({
    initialized: drizzleState.drizzleStatus.initialized,
    Harber: drizzleState.contracts.Harber,
  }));

  const dispatch = useDispatch();

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;

  const [contractsReady, setContractsReady] = useState(false);
  const [sumOfAllPrices, setSumOfAllPrices] = useState(0);

  const [metamaskAlert, setMetamaskAlert] = useState(false);

  useEffect(() => {
    if (!contractsReady) {
      if (Object.keys(Harber["price"]).length === tokens.length) {
        setContractsReady(true);
        let sum = 0;

        tokens.map(async (token) => {
          const tokenPriceKey = contracts.Harber.methods.price.cacheCall(
            token.id
          );

          if (tokenPriceKey in Harber["price"]) {
            const tokenPrice = getTokenPrice(tokenPriceKey);
            const price = await utils.fromWei(tokenPrice, "ether");
            sum += Number(price);
            setSumOfAllPrices(sum);
          }
        });
      }
    }
  });

  const getTokenPrice = (tokenPriceKey) => {
    return new utils.BN(Harber["price"][tokenPriceKey].value);
  };

  const displayToken = async (tokenId) => {
    if (initialized) {
      dispatch(setCurrentToken(tokenId));
      history.push(`/token/${tokenId}`);
    } else {
      setMetamaskAlert(true);
    }
  };

  return (
    <>
      <section className="section-wave section-dark">
        <Container>
          <Row>
            {tokens.map((token) => {
              return (
                <Col
                  key={token.id}
                  md={4}
                  className="d-flex align-items-stretch"
                >
                  <Card
                    onClick={() => displayToken(token.id)}
                    className="d-block w-100"
                  >
                    {initialized ? (
                      <Token token={token} sumOfAllPrices={sumOfAllPrices} />
                    ) : (
                      <>
                        <Image
                          src={window.location.origin + "/logos/" + token.image}
                          alt={token.name}
                          height={130}
                          className="logo-image mb-3"
                        />
                        <h5>{token.name}</h5>
                      </>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <Wave className="wave wave-dark" />
      </section>
    </>
  );
};

export default AllTokens;
