import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import App from './App';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import { pushState, routerStateReducer, reduxReactRouter as clientRouter} from "redux-router";
import { Container } from './components/partials/Container';
import SignUp from "./views/SignUp";

class BaseApp extends React.Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export function initialize({cookies, isServer, currentLocation, userAgent} = {}) {

  const store = createStore(reducer);

  console.log(store.getState());
  
  class Home extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>);
    }
  }

  const routes = (
    <Router history={hashHistory}>
      <Route path="/" component={BaseApp}>
        <IndexRoute component={ Home }/>
        <Route path="register" component={ SignUp } />
      </Route>
    </Router>
  );

  return Promise.resolve({provider:routes});
}