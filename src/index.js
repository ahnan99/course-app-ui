import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/AppContainers';
import './index.css';
import { Provider } from 'react-redux'
import store from './modules/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);