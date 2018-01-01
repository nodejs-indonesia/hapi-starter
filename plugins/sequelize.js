'use strict';

const Models    = require('../models');

exports.register = function (server, options, next) {

    // Connect to db
    Models.sequelize.authenticate().then(() => {

        console.log('Info:', 'Connection has been established successfully.');

    }).catch((err) => {

        console.error('Info:', 'Unable to connect to the database:', err);

    });

    const initDb = (cb) => {

        const sequelize = Models.sequelize;

        // Test if we're in a sqlite memory database. we may need to run migrations.
        if (sequelize.getDialect() === 'sqlite' &&
            (!sequelize.options.storage || sequelize.options.storage === ':memory:')) {
            sequelize.getMigrator({
                Path: process.cwd() + '/database/migrations'
            }).migrate().success(() => {
                // The migrations have been executed!
                cb();
            });
        }
        else {
            cb();
        }
    };

    console.log('Info:', 'Database connected');

    next();
};

exports.register.attributes = {
    name: 'sequelize'
};
