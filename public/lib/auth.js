'use strict';

import sessionStorage from './session_storage';
import http from './http';

export const pathNotNeedLoggedIn = [
  '/chart/error',
  '/chart/login',
  '/chart/mock',
  '/401'
]

export function pathNeedLoggedIn(path) {
  return pathNotNeedLoggedIn.indexOf(path) < 0;
}

export default {

  login(email, pass, cb) {
    console.log('@@@@@@@@ login');

    cb = arguments[arguments.length - 1]

    if (this.loggedIn()) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    http.post('/user/login', {
        username: email,
        password: pass
    })
    .then(r => {
      console.log('@then 1', r)

      if (r.status != 200) {
        return Promise.reject(r.data);
      }

      console.log('@then 2', data);

      sessionStorage.user = JSON.stringify(data);

      if (cb) cb(true)
      this.onChange(true)

    })
    .catch(e => {
      console.log('@then err', e);

      if (cb) cb(false)
      this.onChange(false)
    });
  },

  getUser() {

    if (sessionStorage.user) {
      return JSON.parse(sessionStorage.user);
    }

  },

  getDealerProxy() {

    let user = this.getUser();
    let proxy = "";

    if (user.dealer_proxy !== null) {
      // 无代理商时，为 null
      proxy = user.dealer_proxy;
    }

    return proxy;
  },

  logout(cb) {
    delete sessionStorage.user
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    console.log('@loggedin');


    if (isServer()) {
      // @TODO
      // 由于 match 无法传任意值，所以 server render
      // 无法判断用户是否登录，所以直接返回 true，让前端
      // 检查。但前端有 checksum 不同不渲染的问题
      return Promise.resolve(true);
    }

    return http.get('/user/refresh')
    .then(r => {
      console.log('@then 1', r)

      if (r.status != 200) {
        return Promise.reject(r.data);
      }

      if (!r.data) {
        return Promise.resolve();
      }

      console.log('@then 2', r.data);

      sessionStorage.user = JSON.stringify(r.data);

      console.log('SAVE TO SESSION', sessionStorage.user);

      return Promise.resolve(sessionStorage.user);
    })
    .catch(e => {
      return Promise.reject(e);
    });

  },

  onChange() {}
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}


function isServer() {
  return ! (typeof window != 'undefined' && window.document);
}
