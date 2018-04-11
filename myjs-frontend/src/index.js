/**
 * Created by andrew on 12/02/16.
 */

import React from 'react';
import { createStore, compose, applyMiddleware, combineReducers} from "redux";
import { Provider, connect} from 'react-redux';
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import { Route, IndexRoute, Link, IndexLink } from "react-router";
import { RouterContext } from 'react-router';
import { ReduxRouter } from "redux-router";
import { createHistory, createHashHistory, createMemoryHistory } from "history";
import { pushState, routerStateReducer, reduxReactRouter as clientRouter} from "redux-router";
import { reduxReactRouter as serverRouter } from "redux-router/server";

import mainReducer from './reducers';

import { visitLocation } from './actions/navigate';
import App from './App';
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

class Home extends React.Component {
  render() {
    return (<h1>Hello World!</h1>);
  }
}

export function initialize({cookies, isServer, currentLocation, userAgent} = {}) {

  const reducer = combineReducers({
    app: mainReducer,
    router: routerStateReducer
  });

  let dispatch = null;

  const onEnter = (nextState) => {
    const { location } = nextState;
    dispatch && dispatch(visitLocation(location));
  };

  const routes = (
    <Route path="/" component={BaseApp}>
      <IndexRoute component={ Home }/>
      <Route path="register" component={ SignUp } onEnter={ onEnter } />
    </Route>
  );

  // these methods will differ from server to client
  const reduxReactRouter    = isServer ? serverRouter : clientRouter;
  const createHistoryMethod = isServer ? createMemoryHistory : createHashHistory;
  
  // create the redux store
  const store = compose(
    applyMiddleware(thunk, createLogger()),
    reduxReactRouter({
      routes,
      createHistory: createHistoryMethod
    })
  )(createStore)(reducer);

  dispatch = store.dispatch;

  console.log(store.getState());

  return Promise.resolve({
    provider:(
      <Provider store={store} key="provider">
        <ReduxRouter children={routes} />
      </Provider>
    )
  });
}