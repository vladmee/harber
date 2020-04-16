export const SET_CURRENT_TOKEN = "SET_CURRENT_TOKEN";
export const SET_CURRENT_TX = "SET_CURRENT_TX";

export const setCurrentToken = tokenId => {
  return {
    type: SET_CURRENT_TOKEN,
    payload: { tokenId }
  };
};

export const setCurrentTx = payload => {
  return {
    type: SET_CURRENT_TX,
    payload
  };
};
