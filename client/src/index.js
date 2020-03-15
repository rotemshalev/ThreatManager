import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureStore from './state/store';
import initialState from './state/initialState';
import './index.css';
import App from './components/App';

let store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
