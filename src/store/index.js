import { createBrowserHistory as createHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
//import rootReducer from "./reducers";
import appRootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";
import { generateContractsInitialState } from "drizzle";
import drizzleOptions from "../drizzle/drizzleOptions";

import { generateStore, EventActions } from "@drizzle/store";
import statusReducer from "./reducers/status";

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();

const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
};

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(
//     applyMiddleware(thunkMiddleware, routingMiddleware, sagaMiddleware)
//   )
// );

//sagaMiddleware.run(rootSaga);

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name;
    const contractEvent = action.event.event;
    const contractMessage = action.event.returnValues._message;
    const display = `${contract}(${contractEvent}): ${contractMessage}`;

    // interact with your service
    console.log("Contract event fired", display);
  }
  return next(action);
};

const appReducers = { status: statusReducer };
//const appSagas = [appRootSaga];
const appMiddlewares = [contractEventNotifier, routingMiddleware];

const store = generateStore({
  drizzleOptions,
  appReducers,
  appMiddlewares,
  disableReduxDevTools: false
});

export { history };
export { store };

export default store;
