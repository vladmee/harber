import { takeEvery } from "redux-saga/effects";

import { SET_CURRENT_TOKEN } from "../actions/status";
import { setTokenSaga } from "./status";

export default function* appRootSaga() {
  yield takeEvery(SET_CURRENT_TOKEN, setTokenSaga);
}
