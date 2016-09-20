'use strict';

var _ = require('lodash');
import Auth from '../lib/auth';
var allow = require('./proxy_allows').allow;
var debug = require('debug')('sdk:auth');


var JsonWebTokenError = require('jsonwebtoken/lib/JsonWebTokenError');


/**
 *
 * 过滤代理（proxy）的影响，获取用户真实 IP，由于代理有 slb、nginx 多层，
 * 用 trust proxy 不合适。
 *
 * 需要与 nginx 配置配合使用
 *
 */
function middleware() {

    return function checkAuthMiddleware(req, res, next) {

        let accessToken = req.query['access-token'] || _.get(req, 'headers.x-auth-token', req.cookies.token);
        // 支持从 query 传 token（所以必须用 HTTPS），query 优先级最高

        // @TODO 确定并增强安全性

        if (accessToken) {

            let user = null;
            try {
                user = Auth.verify(accessToken);

                if (!user.uid && !user.hb_uid) {
                    throw new JsonWebTokenError();
                }

                // debug('@check_auth user', user);
            }
            catch (err) {

                // debug('@check_auth catch', err);

                let allowAccessWithoutUser = allow.some((control) => {
                    let reg = new RegExp(control.path);

                    let t =  reg.test(req.path);

                    debug(req.path, reg, t);

                    return t;

                });


                if (allowAccessWithoutUser) {
                    return next();
                }

                next(err);
            }


            if (user) {
                req.user = user;
                req.accessToken = accessToken;

                // 设置后端需要的 header
                req.headers['user-id'] = req.user.uid;

                req.headers['dealer-id'] = _.get(req.user, 'dealer_id', '');
                req.headers['dealer-code'] = _.get(req.user, 'dealer_code', '');
                req.headers['dealer-user-id'] = _.get(req.user, 'duid', '');

                req.headers['identifier'] = req.user.dealer_id + '-' + req.user.duid;

                req.headers['api-auth-method'] = 'token';

            }

        }

        next();

    };

}

function errorHandler(err, req, res, next) {

    let errName = _.get(err, 'name');

    if (errName == 'JsonWebTokenError') {
        // token 解析出错
        res.status(401);
        return res.json({
            code: -1,
            message: 'Token 不合法',
            ext: err.message
        });
    }
    else if (errName == 'TokenExpiredError') {
        // token 解析出错
        res.status(401);
        return res.json({
            code: -2,
            message: 'Token 已过期',
            ext: err.message
        });
    }

    return next(err);
}

export default {
    middleware: middleware,
    errorHandler: errorHandler
};
