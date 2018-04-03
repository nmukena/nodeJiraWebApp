import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger'
import Layout from './components/Layout';
import reducers from './reducers';

//const createStoreWithMiddleware = applyMiddleware(ReduxPromise, createLogger())(createStore);
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Layout />
  </Provider>
  , document.querySelector('.root'));
