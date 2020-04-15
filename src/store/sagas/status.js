import { put, call } from "redux-saga/effects";
import { history } from "../";

import * as actions from "../actions/status";

export function* setTokenSaga(action) {
  console.log(action);
  yield put(actions.setCurrentToken(action.payload));
  yield call(forwardTo, `/token/${action.payload.tokenId}`);
}

function forwardTo(location) {
  history.push(location);
}
