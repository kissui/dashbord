'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import Auth, {pathNeedLoggedIn} from './lib/auth';


import Layout from './views/layout.jsx';
import HomePage from './views/schema/schemaPage.jsx';
import analysisPage from './views/analysis/analysis.jsx';
import MockPage from './views/mock/mock.jsx';
import LoginPage from './views/login.jsx';
import LogoutPage from './views/logout.jsx';

import UnauthorizedPage from './views/401.jsx';
import errorPage from './views/error/error.jsx';

// onEnter(nextState, replaceState, callback?)
//
// Called when a route is about to be entered. It provides the next
// router state and a function to redirect to another path. this will
// be the route instance that triggered the hook.
function requireAuth(nextState, replaceState, cb) {

    console.log('nextState location', nextState.location);

    if (!pathNeedLoggedIn(nextState.location.pathname)) {
        console.log('NOT-NEED logged in');
        // 不需登录
        return cb();
    }

    console.log('NEED logged in');

    Auth.loggedIn().then(ret => {

        console.log('AUTH result', ret);

        if (ret) {

            console.log('allow access');

            // 登录成功
            return cb();
        }

        console.log('forbid access');

        // 登录失败
        replaceState({
            pathname: '/group/error',
            state: {nextPathname: nextState.location.pathname}
        });
        return cb();

    }).catch(err => {
        console.error('requireAuth err', err);

        return cb();
    });

}

// @todo 现在有缺少 browserHistory 的报错，但在这儿加了没用，好像是后端 render 的
export default (
    <Router>
        <Route path='/group' component={Layout} >
            <IndexRoute component={HomePage}/>
            <Route path='/group/table' component={HomePage}>
                <Route path='/group/table/report/:folderId/:fileId' component={HomePage}/>
                <Route path='/group/table/new/:fileId' component={HomePage}/>
                <Route path='/group/table/edit/:fileId' component={HomePage}/>
            </Route>
            <Route path="/group/analysis" component={analysisPage}/>
            <Route path="/group/mock" component={MockPage}/>
            <Route path="/group/login" component={LoginPage}/>
            <Route path="/group/logout" component={LogoutPage}/>
            <Route path='/group/401' component={UnauthorizedPage}/>
            <Route path='/group/error' component={errorPage}/>
            <Redirect from='/gohome' to='/'/>
        </Route>
    </Router>
);