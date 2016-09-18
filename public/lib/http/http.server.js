'use strict';

import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://192.168.1.122:8091',
  timeout: 1000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  proxy: {
    host: '127.0.0.1',
    port: 3000
  }
});

export default instance;
