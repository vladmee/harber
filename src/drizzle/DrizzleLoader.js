import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import OfflineError from "../drizzle/OfflineError";

const { useDrizzleState } = drizzleReactHooks;

function DrizzleLoader({ children }) {
  const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
  if (drizzleStatus.initialized === false) {
    return <OfflineError />;
  }
  return <>{children}</>;
}
export default DrizzleLoader;
