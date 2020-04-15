export const SET_CURRENT_TOKEN = "SET_CURRENT_TOKEN";

export const setCurrentToken = tokenId => {
  return {
    type: SET_CURRENT_TOKEN,
    payload: { tokenId }
  };
};
