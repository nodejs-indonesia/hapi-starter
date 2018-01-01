'use strict';

module.exports = [
    //set up good to log every kind of event. Change according to your needs.
    {
        register: require('good'),
        options: {
            // ops: {
            //     interval: 1000
            // },
            reporters: {
                myConsoleReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        log: '*',
                        response: '*',
                        request: '*',
                        ops: '*',
                        error: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout'],
                myFileReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        log: '*',
                        // response: '*',
                        // request: '*',
                        // ops: '*',
                        error: '*'
                    }]
                }, {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                    // args: [
                    //     null,
                    //     {
                    //         separator: ','
                    //     }
                    // ]
                }, {
                    module: 'rotating-file-stream',
                    args: [
                        'ops_log',
                        {
                            path: './logs',
                            size:     '10M', // rotate every 10 MegaBytes written
                            interval: '1d'  // rotate daily
                            // compress: 'gzip' // compress rotated files

                        }
                    ]
                    // {
                    //     module: 'good-file',
                    //     args: ['./test/fixtures/awesome_log']
                    // }]
                }]
            }
        }
    },
    {
        register: require('hapi-auth-jwt2')
    },
    {
        register: require('./socketio')
    },
    {
        register: require('./sequelize')
    }
    // require additional plugins here
];
