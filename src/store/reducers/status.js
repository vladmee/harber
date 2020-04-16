import { SET_CURRENT_TOKEN, SET_CURRENT_TX } from "../actions/status";

export default function(
  state = {
    currentToken: null,
    currentTx: {
      active: false,
      name: null,
      stackTempKey: null,
      txHash: null,
      status: null
    }
  },
  action
) {
  switch (action.type) {
    case SET_CURRENT_TOKEN: {
      const { tokenId } = action.payload;
      return {
        ...state,
        currentToken: tokenId
      };
    }
    case SET_CURRENT_TX: {
      return {
        ...state,
        currentTx: {
          ...state.currentTx,
          ...action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
