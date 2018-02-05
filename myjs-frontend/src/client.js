import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';

import MyApp from './index';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={MyApp}/>
  </Router>,
  document.getElementById('root')
);