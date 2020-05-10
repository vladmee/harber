const addBN = (xValue, yValue) => {
  let BN = "";
  const x = String(xValue);
  const y = String(yValue);
  let len;
  const lenx = x.length;
  const leny = y.length;
  let x1,
    y1,
    rem,
    div = 0;

  if (lenx > leny) len = lenx;
  else len = leny;

  for (let i = 0; i < len; i++) {
    if (i >= lenx) x1 = 0;
    else x1 = parseInt(x[lenx - i - 1]);
    if (i >= leny) y1 = 0;
    else y1 = parseInt(y[leny - i - 1]);
    rem = (x1 + y1 + div) % 10;
    div = Math.floor((x1 + y1 + div) / 10);
    BN = rem + BN;
  }
  if (div > 0) {
    BN = div + BN;
  }
  return BN;
};

export default addBN;
