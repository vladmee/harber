import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import BuyTokenSection from "./BuyTokenSection";
import ActionSection from "./ActionSection";
import DetailsSection from "./DetailsSection";
// import LeaderboardSection from "./LeaderboardSection";

import { setCurrentToken } from "../../../store/actions/status";
import { history } from "../../../store";

import { Container, Row, Col } from "react-bootstrap";
import Token from "../../tokens/Token";
import { tokens } from "../../tokens/premier-league";
import { ReactComponent as Wave } from "../../../assets/dividers/wave.svg";
import { ReactComponent as Div1 } from "../../../assets/dividers/vert-col.svg";
import { ReactComponent as Div2 } from "../../../assets/dividers/horz-col-1.svg";
import { ReactComponent as Div3 } from "../../../assets/dividers/horz-col-2.svg";
import { ReactComponent as Div4 } from "../../../assets/dividers/horz-row.svg";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const OneToken = (props) => {
  const { drizzleState, initialized } = useDrizzleState((drizzleState) => ({
    drizzleState: drizzleState,
    initialized: drizzleState.drizzleStatus.initialized,
  }));

  const urlId = useSelector((state) => state.status.currentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!urlId) {
      const url_string = window.location.href;
      const id = url_string.substring(url_string.lastIndexOf("/") + 1);
      dispatch(setCurrentToken(id));
    }
  }, []);

  useEffect(() => {
    if (drizzleState && !initialized) {
    }
  }, [drizzleState]);

  return (
    <>
      {initialized && (
        <section className="section-wave section-dark">
          {urlId ? (
            <Container className="container-full">
              <Row noGutters className="position-relative">
                <Col lg={6}>
                  <div className="grid-tile top-left position-relative">
                    <Token token={tokens[urlId]} />
                    <Div2 className="div div-2 d-none d-lg-block" />
                  </div>
                  <div className="grid-tile">
                    <DetailsSection />
                  </div>
                </Col>
                <Col lg={6} className="d-flex flex-column">
                  <div className="grid-tile top-right position-relative">
                    <BuyTokenSection />
                    <Div3 className="div div-3 d-none d-lg-block" />
                  </div>
                  <div
                    className="grid-tile d-flex flex-column align-items-center justify-content-center"
                    style={{ flex: 1 }}
                  >
                    <ActionSection />
                  </div>
                </Col>
                <Div1 className="div div-1 d-none d-lg-block" />
                <Div4 className="div div-4 d-none d-lg-block" />
              </Row>
              {/* <Row noGutters>
                <div className="grid-tile bottom-right bottom-left">
                  <LeaderboardSection />
                </div>
              </Row> */}
            </Container>
          ) : null}
          <Wave className="wave wave-dark" />
        </section>
      )}
    </>
  );
};

export default OneToken;
