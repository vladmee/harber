import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import LearnMore from "../TokensPage/LearnMore";
import LeagueInfo from "../TokensPage/LeagueInfo";
import AllTokens from "../TokensPage/AllTokens";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Home = (props) => {
  const { initialized } = useDrizzleState((drizzleState) => ({
    initialized: drizzleState.drizzleStatus.initialized,
  }));

  return (
    <>
      <LearnMore />
      <LeagueInfo initialized={initialized} />
      <AllTokens initialized={initialized} />
    </>
  );
};

export default Home;
