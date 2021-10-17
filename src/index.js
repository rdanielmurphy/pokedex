import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux-store';
import { App } from './App.jsx';

import "./index.css";

/**
 *
 * App initialization
 *
 */
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

