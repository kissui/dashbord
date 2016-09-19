import express from 'express';
import favicon from 'serve-favicon';
import ReactEngine from 'react-engine';
import {join} from 'path';
import routes from '../public/routes.jsx';
import Auth from '../lib/auth';

import _ from 'lodash';
import http from '../public/lib/http';

import BPromise from 'bluebird';

// @todo 需要找办法前后端共享该文件
import {pathNeedLoggedIn} from '../public/lib/auth';

import url from 'url';


function setup(app) {

    // expose public folder as static assets
    app.use(express.static(join(__dirname, '/../dist'), {
        etag: false, // 有集群的话，不同机器的 etag 可能会不一样，所以关掉
        maxAge: 2592000000 // 1 month，cache 更好的方法是用 cache-control，来达到 200 (from cache)
    }));

    app.use(favicon(join(__dirname, '/../public/favicon.ico')));

    // create the view engine with `react-engine`
    let engine = ReactEngine.server.create({
        routes: routes,
        routesFilePath: join(__dirname, '/../public/routes.jsx'),
        performanceCollector: function(stats) {
            // console.log(stats);
        }
    });

    // set the engine
    app.engine('.jsx', engine);

    // set the view directory
    app.set('views', join(__dirname, '/../public/views'));

    // set jsx as the view engine
    app.set('view engine', 'jsx');

    // finally, set the custom view
    app.set('view', ReactEngine.expressView);



    // add our app routes
    app.get('/', function(req, res) {
        res.redirect('/chart');
        // @todo 改为下面的写法，减少一次来回请求，
        // 但需 router 挂载多个地址
        // req.url = '/app';
    });
    app.get(['/chart', '/chart/*'], function(req, res, next) {

        // if (!pathNeedLoggedIn(req.url)) {
        //     // 不需登录
        //
        //     return res.render(req.url, {
        //         // movies: movies
        //     });
        // }


        // 因为 render 在 match 时无法传自定义属性，所以需要
        // 在 render 前判断权限、跳转
        // if (!req.user) {
        //     req.url = '/app/error';
        // }


        // if (req.accessToken) {
        //     res.cookie('token', req.accessToken, {
        //         httpOnly: true,
        //
        //         // @todo 设置 domain，页面既可能是单独网站，又可能是 iframe。
        //         // 对于 iframe，不设置 domain，cookie 就都存到 app 的 domain 了，
        //         // 就泄漏了。但 domain 需判断域名，可能有多域名 yunzhanghu/easemob 等
        //
        //         // @TODO 设置与 token 相同的 expires（有必要吗？FE 没法拿 cookie、
        //         // 用 cookie 判断登陆状态及登陆是否过期）
        //         // expires: Date, Expiry date of the cookie in GMT. If not
        //         //          specified or set to 0, creates a session cookie.
        //         // maxAge: String, Convenient option for setting the expiry time
        //         //         relative to the current time in milliseconds.
        //
        //         // @TODO 还有一些安全设置可参考：
        //         // https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/
        //
        //     });
        // }

        var render = function(initialState) {

            let data = {
                // render 时传 ua，以判断是否加载 shim
                ua: req.get('user-agent'),

                // 供首屏加载
                serverSide: !_.isEmpty(initialState),
                initialState: initialState,
                originalQuery: req.query
            };


            // @TODO 只要 url 带 query，render 就会报错，未查出原因，
            // 所以，用 req.path render，query 按 params 传递
            // { [Error: Cannot find module '-DkYDQ7uwt9m2jRhs8x1ebJoZIzp_yqkeifsOoat9GU'] code: 'MODULE_NOT_FOUND' }
            res.render(req.path, data);
        };

        // 根据 url，在服务器端获取数据


        // if (req.path === '/app' || req.path === '/app/') {
        //     // 首页
        //
        //     http.get('/api/hongbao/wallet', {
        //         headers: { // @todo 所有请求都应带 headers
        //             'user-id': req.user.uid,
        //             'dealer-id': _.get(req.user, 'dealer_id', ''),
        //             'dealer-code': _.get(req.user, 'dealer_code', ''),
        //             'dealer-user-id': _.get(req.user, 'duid', ''),
        //             'identifier': req.user.dealer_id + '-' + req.user.duid,
        //             'api-auth-method': 'token',
        //         }
        //     })
        //     .then(r => r.data)
        //     .then(data => ({ money: data.data.Balance}))
        //     .then(initialState => render(initialState));
        // }

        // else {
            render();
        // }


    });

}

function errorHandler(err, req, res, next) {
  if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
    return res.redirect(302, err.redirectLocation);
  }
  else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
    return res.redirect('/chart/error');
    // return res.status(404).send('Route Not Found!');
  }
  else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR) {
    return res.redirect('/chart/error');
    // for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR just send the error message back
    // return res.status(500).send(err.message);
  }
  else {
    return next(err);
  }
}

export default {
    setup: setup,
    errorHandler: errorHandler
};
