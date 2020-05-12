import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import { Container, Row } from "react-bootstrap";
import { ReactComponent as Wave } from "../../../assets/dividers/wave.svg";

import toEth from "../../utils/toEth";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

const LeagueInfo = ({ initialized }) => {
  const { drizzle } = useDrizzle();
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);

  return (
    <section className="section-wave section-league">
      <Container>
        <Row className="text-center">
          <h3 className="w-100 mb-3">English Premier League 19/20</h3>
          {initialized && (
            <p className="w-100 lead mb-3">
              Total rent collected:{" "}
              <span className="text-primary">
                $
                <ContractData
                  contract="RealityCards"
                  method="totalCollected"
                  methodArgs={[]}
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  render={(amount) => toEth(amount, drizzle)}
                />
              </span>
            </p>
          )}
          <p className="w-75 mx-auto mb-3">
            To rent a team, set a daily rental price (which must be higher than
            the current price) and deposit some Dai. The owners of the team that
            win will receive a split of all rental payments, in proportion to
            how long they have owned the team. There is one Non Fungible Token
            per team.
          </p>
        </Row>
      </Container>
      <Wave className="wave wave-light" />
    </section>
  );
};

export default LeagueInfo;
