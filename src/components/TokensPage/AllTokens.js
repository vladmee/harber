import React, { useState, useEffect, useRef } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import Token from "../tokens/Token";
import LearnMore from "./LearnMore";
import LeagueInfo from "./LeagueInfo";

import { teams } from "../tokens/teams";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ReactComponent as Wave } from "../../assets/dividers/wave.svg";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const AllTokens = () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  const utils = drizzle.web3.utils;
  const contracts = drizzle.contracts;
  const contractsState = state.contracts;

  const [contractsReady, setContractsReady] = useState(false);
  const [sumOfAllPrices, setSumOfAllPrices] = useState(0);

  const getArtworkPrice = tokenPriceKey => {
    return new utils.BN(contractsState["Harber"]["price"][tokenPriceKey].value);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!contractsReady) {
      if (
        Object.keys(contractsState["Harber"]["price"]).length === teams.length
      ) {
        setContractsReady(true);
        let sum = 0;

        teams.map(async token => {
          const tokenPriceKey = contracts.Harber.methods.price.cacheCall(
            token.id
          );

          if (tokenPriceKey in contractsState["Harber"]["price"]) {
            const price = await utils.fromWei(
              getArtworkPrice(tokenPriceKey),
              "ether"
            );
            sum += Number(price);
            setSumOfAllPrices(sum);
          }
        });
      }
    }
  });

  return (
    <>
      <LearnMore />
      <LeagueInfo />
      <section className="section-wave section-dark">
        <Container>
          <Row>
            {teams.map(team => {
              return (
                <Col
                  key={team.id}
                  md={4}
                  className="d-flex align-items-stretch"
                >
                  <Card
                    as={"a"}
                    href={`/token?id=${team.id}`}
                    className="d-block w-100"
                  >
                    <Token
                      urlId={team.id}
                      name={team.name}
                      image={team.logo}
                      sumOfAllPrices={sumOfAllPrices}
                    />
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
