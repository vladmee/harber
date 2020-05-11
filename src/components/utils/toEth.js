import roundTwoDecimals from "./roundTwoDecimals";

const toEth = (amount, drizzle) => {
  amount = drizzle.web3.utils.fromWei(String(amount), "ether");
  return roundTwoDecimals(amount);
};

export default toEth;
