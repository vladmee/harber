import React from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Col, Alert, Image, Button } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const DrizzleWarning = () => {
  const { drizzle } = useDrizzle();
  const { initialized } = useDrizzleState((drizzleState) => ({
    initialized: drizzleState.drizzleStatus.initialized,
  }));

  if (initialized) {
    return null;
  }

  return (
    <Alert
      variant="warning"
      className="d-flex flex-row justify-content-around align-items-center text-center rounded mx-auto"
      style={{ width: "80%" }}
    >
      <Col xs={1}>
        <Image src="/img/metamask.png" height={40} />
      </Col>
      <Col>
        <p className="font-weight-bold mb-0 mx-3">
          To use the blockchain features, make sure you have the MetaMask
          browser extension installed, unlocked, and set to Kovan network.
        </p>
      </Col>
      <Col xs={3}>
        <Button
          variant={"secondary"}
          href={"https://metamask.io/"}
          target="_blank"
        >
          Install MetaMask
        </Button>
      </Col>
    </Alert>
  );
};

export default DrizzleWarning;
