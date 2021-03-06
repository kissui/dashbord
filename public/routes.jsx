'use strict';
import React from 'react';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import Auth, {pathNeedLoggedIn} from './lib/auth';


import Layout from './views/layout.jsx';
import HomePage from './views/schema/box.jsx';
import ReportNewPage from './views/schema/new/box.jsx';
// import LoginPage from './views/login.jsx';
import LogoutPage from './views/logout.jsx';
import ChartPage from './views/chart/index';
import UnauthorizedPage from './views/401.jsx';
import errorPage from './views/error/error.jsx';
import SourcePage from './views/source/source';
/** cube op route **/
import CubePage from './views/cubepage/default';
import CubeListPage from './views/cubepage/list/list';
import CubeCreatedPage from './views/cubepage/new/new';
/** new rport page**/
import ReportPage from './views/report/index';
// onEnter(nextState, replaceState, callback?)
//index
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
			pathname: '/chart/error',
			state: {nextPathname: nextState.location.pathname}
		});
		return cb();

	}).catch(err => {
		console.error('requireAuth err', err);

		// 现在会出现 Error:
		// dangerouslyReplaceNodeWithMarkup(...): Cannot replace
		// markup of the <html> node. This is because browser quirks
		// make this unreliable and/or slow. If you want to render to
		// the root you must use server rendering. See
		// ReactDOMServer.renderToString().
		//
		// 原因暂未查出，未避免业务出错，暂在此不跳转
		//
		// replaceState({
		//     pathname: '/chart/error',
		//     state: { nextPathname: nextState.location.pathname }
		// });
		return cb();
	});

}
// onEnter={requireAuth}
// @todo 现在有缺少 browserHistory 的报错，但在这儿加了没用，好像是后端 render 的
export default (
	<Router>
		<Route path='/index' component={Layout}>
			<IndexRoute component={HomePage}/>
			<Route path='/index/report/schema' component={HomePage}/>
			<Route path='/index/report/schema/:folderId/:fileId' component={HomePage}/>
			<Route path='/index/report/new' component={ReportNewPage}/>
			<Route path='/index/report/edit/:folderId/:fileId' component={ReportNewPage}/>
			<Route path='/index/report/cube' component={CubePage}/>
			<Route path='/index/report/cube/edit/:cubeId' component={CubeListPage}/>
			<Route path='/index/report/cube/new' component={CubeCreatedPage}/>
			<Route path='/index/chart' component={ChartPage}/>
			<Route path='/index/report/test' component={ReportPage}/>
			<Route path='/index/report/test/:folderId/:fileId' component={ReportPage}/>
			<Route path='/index/source' component={SourcePage}/>
			<Route path='/index/401' component={UnauthorizedPage}/>
			<Route path='/index/error' component={errorPage}/>
			<Redirect from='/gohome' to='/'/>
		</Route>
	</Router>
);
