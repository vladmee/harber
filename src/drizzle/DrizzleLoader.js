import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

const { useDrizzleState } = drizzleReactHooks;

function DrizzleLoader({ children }) {
  const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
  if (drizzleStatus.initialized === false) {
    return <main>Loading</main>;
  }
  return <>{children}</>;
}
export default DrizzleLoader;
