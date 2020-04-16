import {
  SET_CURRENT_TOKEN,
  SET_CURRENT_TX,
  CLEAR_CURRENT_TX
} from "../actions/status";

const emptyTx = {
  active: false,
  name: null,
  stackTempKey: null,
  txHash: null,
  status: null
};

export default function(
  state = {
    currentToken: null,
    currentTx: emptyTx
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
    case CLEAR_CURRENT_TX: {
      return {
        ...state,
        currentTx: emptyTx
      };
    }
    default: {
      return state;
    }
  }
}
