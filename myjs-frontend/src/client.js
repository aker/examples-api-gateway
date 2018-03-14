import React from 'react';
import ReactDOM from 'react-dom';
import { initialize } from './index';
/**
 * Fire-up React Router.
 */
initialize().then(({ provider }) => {
  const reactRoot = window.document.getElementById("root");
  ReactDOM.render(provider, reactRoot);
});