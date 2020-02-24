import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { DrizzleProvider } from "drizzle-react";
import OfflineContainer from "../../drizzle/OfflineContainer";
import drizzleOptions from "../../drizzle/drizzleOptions";

const DrizzleRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <>
            <DrizzleProvider options={drizzleOptions}>
              <OfflineContainer>
                <Component {...props} />
              </OfflineContainer>
            </DrizzleProvider>
          </>
        );
      }}
    />
  );
};

export default withRouter(DrizzleRoute);
