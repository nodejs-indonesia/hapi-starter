'use strict';

require('dotenv').config();

const config = {
    development: {
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        labels: 'app',
        routes: {
            cors: true
        },
        secretKey: process.env.JWT_SECRET_KEY,
        algorithms: process.env.JWT_ALGORITHMS,
        expiresIn: process.env.JWT_EXPIRE_TIME,
        tokenType: process.env.JWT_TOKEN_TYPE
    },
    test: {
        host: 'localhost',
        port: 3001,
        secretKey: 'foobar'
    },
    production: {
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        labels: 'app',
        secretKey: process.env.JWT_SECRET_KEY,
        algorithms: process.env.JWT_ALGORITHMS,
        expiresIn: process.env.JWT_EXPIRE_TIME,
        tokenType: process.env.JWT_TOKEN_TYPE
    }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
