import { SET_CURRENT_TOKEN } from "../actions/status";

export default function(state = { currentToken: null }, action) {
  switch (action.type) {
    case SET_CURRENT_TOKEN: {
      const { tokenId } = action.payload;
      return {
        ...state,
        currentToken: tokenId
      };
    }
    default: {
      return state;
    }
  }
}
