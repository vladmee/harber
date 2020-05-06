import React from "react";
import { Provider } from "react-redux";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import drizzleOptions from "./drizzleOptions";
import App from "../App";

import { store } from "../store";

const drizzle = new Drizzle(drizzleOptions, store);
const { DrizzleProvider } = drizzleReactHooks;

const AppWithRedux = ({ drizzle, store }) => {
  return (
    <Provider store={store}>
      <App drizzle={drizzle} store={store} />
    </Provider>
  );
};

const DrizzleLoader = () => {
  const hasWeb3Provider = () => {
    const hasWeb3Provider = typeof window.ethereum !== "undefined";
    return hasWeb3Provider;
  };

  return hasWeb3Provider ? (
    <DrizzleProvider drizzle={drizzle}>
      <AppWithRedux drizzle={drizzle} store={store} />
    </DrizzleProvider>
  ) : (
    <AppWithRedux drizzle={null} store={store} />
  );
};

export default DrizzleLoader;
