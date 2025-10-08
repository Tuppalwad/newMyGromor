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
    apiMiddleware,   // ✅ must come before thunk
    thunk,
    // createLogger(),  // keep last for clean logs
  ),
);


export const CProvider = ({ children }) => {
  return <Provider store={myStore}>{children}</Provider>;
};
