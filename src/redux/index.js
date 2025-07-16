import React from 'react';
// import { createStore } from 'redux';
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';

// import {createLogger} from 'redux-logger';
import { Provider } from 'react-redux';

import rootReducer from './reducer';
import apiMiddleware from './middleware';

const myStore = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    createLogger(), // add if u want log to check
    apiMiddleware,
  ),
);

export const CProvider = ({ children }) => {
  return <Provider store={myStore}>{children}</Provider>;
};
