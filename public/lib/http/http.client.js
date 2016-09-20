'use strict';

import axios from 'axios';

export default axios;
console.log('http.client.js');
var instance = axios.create({
  timeout: 10000,

  headers: {
    'version': 'web_rp_2.0.0' // @TODO 使用配置文件
  },
});

export default instance;
