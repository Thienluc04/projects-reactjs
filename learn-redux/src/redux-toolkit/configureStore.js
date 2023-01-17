import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterSlice, { incrementByValue } from "./counterSlice";
import globalSlice from "./globalSlice";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  counter: counterSlice,
  global: globalSlice,
});

// const loggerMiddleware = (store) => (next) => (action) => {
//   console.log(action);
//   action.payload = 10;
//   next(action);
// };

const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

// store.subscribe(() => {
//   console.log(`Current state: ${store.getState().counter.count}`);
// });

// sagaMiddleware.run(rootSaga)
export default store;
