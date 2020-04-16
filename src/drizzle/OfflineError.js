import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { ReactComponent as Wave } from "../assets/dividers/wave.svg";
import ConnectionBanner from "@rimble/connection-banner";

const OfflineError = ({ networkId, drizzleStatus }) => {
  const [currentNetwork, setCurrentNetwork] = useState(null);

  useEffect(() => {
    if (networkId) {
      setCurrentNetwork(networkId);
    }
    if (drizzleStatus && !drizzleStatus.initialized && window.web3) {
      window.web3.version.getNetwork((error, networkId) => {
        setCurrentNetwork(parseInt(networkId));
      });
    }
  }, [networkId, drizzleStatus]);

  return (
    <section className="section-wave section-dark">
      <Container>
        <Row>
          <ConnectionBanner
            currentNetwork={currentNetwork}
            requiredNetwork={3}
            //TODO: requiredNetwork set to Kovan now
            onWeb3Fallback={null}
          />
        </Row>
      </Container>
      <Wave className="wave wave-dark" />
    </section>
  );
};

export default OfflineError;
