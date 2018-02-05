import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer';
import App from './App';
import { Router, Route, hashHistory } from 'react-router';

const store = createStore(reducer);

class MyApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default MyApp;