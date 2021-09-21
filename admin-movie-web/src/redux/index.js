import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleWareSaga))
);
middleWareSaga.run(rootSaga);

export default store;
