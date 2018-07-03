import "es6-promise";
import { render } from 'react-dom';
import * as React from 'react';
import * as _ from 'lodash';
import IndexContainer from './index-container';


var app = React.createElement(IndexContainer);
const appMount = document.getElementById('app');
render(app, appMount);