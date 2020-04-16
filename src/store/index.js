import { createBrowserHistory as createHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import appRootSaga from "./sagas";
import drizzleOptions from "../drizzle/drizzleOptions";

import { generateStore } from "@drizzle/store";
import statusReducer from "./reducers/status";

import { setCurrentTx } from "./actions/status";

const history = createHistory();
const routingMiddleware = routerMiddleware(history);

const contractEventNotifier = store => next => action => {
  if (action.type === "SEND_CONTRACT_TX") {
    store.dispatch(
      setCurrentTx({
        name: action.fnName,
        active: true,
        stackTempKey: action.stackTempKey,
        status: "SENDING"
      })
    );
  }

  if (action.type === "TX_BROADCASTED") {
    store.dispatch(
      setCurrentTx({
        txHash: action.txHash,
        status: "BROADCASTED"
      })
    );
  }

  if (action.type === "TX_SUCCESSFUL") {
    store.dispatch(
      setCurrentTx({
        status: "SUCCESSFUL",
        active: false
      })
    );
  }

  if (action.type === "TX_ERROR") {
    store.dispatch(
      setCurrentTx({
        status: "ERROR",
        active: false
      })
    );
  }

  return next(action);
};

const appReducers = { status: statusReducer };
const appSagas = [];
const appMiddlewares = [contractEventNotifier, routingMiddleware];

const store = generateStore({
  drizzleOptions,
  appReducers,
  appSagas,
  appMiddlewares,
  disableReduxDevTools: false
});

export { history };
export { store };

export default store;
