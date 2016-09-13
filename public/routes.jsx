
'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import Layout from './views/layout.jsx';
import IndexPage from './views/containers/index.jsx';
import DetailPage from './views/detail.jsx';
import Error404 from './views/404.jsx';

module.exports = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={IndexPage} />
      <Route path='/movie/:id' component={DetailPage} />
      <Redirect from='/gohome' to='/' />
      <Route path='*' component={Error404} />
    </Route>
  </Router>
);