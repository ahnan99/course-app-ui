import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
import './index.css';
import { Provider } from 'react-redux'
import store from './modules/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);