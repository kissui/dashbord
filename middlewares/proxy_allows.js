'use strict';

var proxyCheckObj = {

    allow: [{
                method: 'post',
                path: '^/token'
            }, {
                method: 'get',
                path: '^/app'
            }],

    // 可以这样对线上的 access.log 筛选接口
    // grep -v HEAD access.log  | awk '{print $6,$7}' | sed 's/\?.*//' | sort | uniq -c | sort -k 3 -k 2

    /**********************  需要通过代理验证的接口    *******************/
    validate:[

        // api 类请求在后端会根据 header 做验证，
        // 所以直接通过
        {
            method:'GET',
            url:'/*'
        },
        {
            method:'GET',
            url:'/api/*'
        },
        {
            method:'POST',
            url:'/api/*'
        },
        {
            method:'POST',
            url:'/api/ss/'
        }

    ]
    //  validate end
};

module.exports = proxyCheckObj;
