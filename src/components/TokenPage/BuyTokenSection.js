import React from "react";

import BuyForm from "./BuyForm";
import DaiBalanceSection from "./DaiBalanceSection";
import TestDaiFaucetSection from "../TestFaucet/TestDaiFaucetSection";

const BuyTokenSection = () => {
  return (
    <>
      <h5 className="mb-4">Rent Team</h5>
      {window.ethereum !== undefined ? (
        <>
          {/* <p>You will pay <ContractData contract="Harber" method="price(0)" toEth/> ETH.<br /> Add your own sale price and amount you want to deposit for patronage: </p> */}
          <DaiBalanceSection />

          <div className="mb-3">
            <TestDaiFaucetSection />
          </div>

          <BuyForm
            contract="Harber"
            method="newRental"
            labels={["New Rental Price"]}
            valueLabel="Your Initial Deposit"
            sendArgs={{}}
          />
        </>
      ) : (
        <>
          [In order to buy a token you need to have a web3/Ethereum-enabled
          browser. Please download the{" "}
          <a href="https://metamask.io">MetaMask Chrome extension</a> or open in
          an Ethereum mobile browser.]
        </>
      )}
    </>
  );
};

export default BuyTokenSection;
