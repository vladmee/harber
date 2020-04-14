import React from "react";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import drizzleOptions from "./drizzle/drizzleOptions";
import DrizzleLoader from "./drizzle/DrizzleLoader";
import AppRoutes from "./AppRoutes";

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <DrizzleProvider drizzle={drizzle}>
      <DrizzleLoader>
        <AppRoutes />
      </DrizzleLoader>
    </DrizzleProvider>
  );
}

export default App;
