import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import 'whatwg-fetch';
import 'es6-promise';

const reactRoot = document.getElementById('app');

ReactDOM.render(
  <App />,
  reactRoot
);