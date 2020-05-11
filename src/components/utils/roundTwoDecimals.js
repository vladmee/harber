const roundTwoDecimals = (value) => {
  if (isNaN(value)) {
    return "Fetching...";
  }

  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
};

export default roundTwoDecimals;
