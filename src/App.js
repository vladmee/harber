import React from "react";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Provider } from "react-redux";

import drizzleOptions from "./drizzle/drizzleOptions";
import DrizzleLoader from "./drizzle/DrizzleLoader";
import AppRoutes from "./AppRoutes";

import { store } from "./store";

const drizzle = new Drizzle(drizzleOptions, store);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <DrizzleProvider drizzle={drizzle}>
      <DrizzleLoader>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </DrizzleLoader>
    </DrizzleProvider>
  );
}

export default App;
