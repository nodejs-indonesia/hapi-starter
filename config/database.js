'use strict';

// const fs = require('fs');
require('dotenv').config();

module.exports = {
    development: {
        database: process.env.DEV_DB_NAME,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        dialect: 'mysql'
    },

    test: {
        dialect: 'sqlite',
        storage: '../database/database.sqlite'
    },

    production: {
        database: process.env.PROD_DB_NAME,
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,
        dialect: 'mysql'
        // dialectOptions: {
        //     ssl: {
        //         ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
        //     }
        // }
    }
};
