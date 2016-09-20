'use strict';

const request = require('superagent-bluebird-promise');
const debug = require('debug')('sdk:tracker');
const winston = require('winston');
const BPromise = require('bluebird');
const logfile = __dirname + '/../logs/track.log';
const _ = require('lodash');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: logfile })
    ]
});


module.exports = function(server) {

    debug('@tracker');

    return function() {

        // 未配置 server 时，不发日志
        var sendLog = false;
        if (server) {
            sendLog = true;
        }


        var trackAPI = server + '/saveLog/etlData';

        var track = function(logs, req) {

            if (!_.isArray(logs)) {
                logs = [logs];
            }


            var extendData = {
                server_timestamp: Date.now()
            };

            logs.forEach(function addExtendDataToLogs(log) {
                _.assign(log, extendData);
            });

            logger.info('logs', {logs: logs});

            if (!sendLog) {
                return BPromise.resolve(true);
            }

            return request.post(trackAPI)
                .type('form')
                .send({
                    ETL: JSON.stringify(logs)
                })
                .then(res => {
                }, err => {
                    logger.warn('err', {
                        err: err
                    });
                });
        };

        return {
            track: track
        };

    }();

};
