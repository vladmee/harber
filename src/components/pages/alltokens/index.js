import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import LearnMore from "./LearnMore";
import LeagueInfo from "./LeagueInfo";
import AllTokens from "./AllTokens";

const { useDrizzleState } = drizzleReactHooks;

const Home = (props) => {
  const { initialized } = useDrizzleState((drizzleState) => ({
    initialized: drizzleState.drizzleStatus.initialized,
  }));

  return (
    <>
      <LeagueInfo initialized={initialized} />
      <AllTokens initialized={initialized} />
    </>
  );
};

export default Home;
