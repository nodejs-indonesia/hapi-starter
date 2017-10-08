'use strict';

const Hapi      = require('hapi');
// const Path      = require('path');
const _         = require('lodash');
const JwToken   = require('./plugins/jwToken'); // bring your own validation function
const server    = new Hapi.Server(); // Create a server with a host and port
const Config    = require('./config/app'); // Config app
const Routes    = require('./routes'); // Add the route
const Plugins   = require('./plugins'); // Load Plugins
const Models    = require('./database/models'); // Add the Models


//Server Config
server.connection(_.pick(Config, ['host', 'port', 'Routes']));

// Export the server to be required elsewhere.
module.exports = server;

server.register(Plugins, (err) => {

    if (err) {
        console.log('error', 'failed to install Plugins');
        console.log(err);
        throw err;
    };

    console.log('info', 'Plugins registered');

    //Connect to db
    Models.sequelize.authenticate().then(() => {

        console.log('Connection has been established successfully.');

    }).catch((err) => {

        console.error('Unable to connect to the database:', err);

    });

    const initDb = (cb) => {

        const sequelize = Models.sequelize;

        //Test if we're in a sqlite memory database. we may need to run migrations.
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
    console.log('info', 'Database connected');

    server.auth.strategy('jwt', 'jwt', {
        key: Config.secretKey, // Never Share your secret key
        // key: Buffer('<Your Base64 encoded secret key>', 'base64'), // Using Base64 encoded secret keys
        validateFunc: JwToken.validate, // validate function defined above
        verifyOptions: {
            algorithms: [Config.algorithms]
        }, // pick a strong algorithm
        tokenType: Config.tokenType // Allow custom token type, e.g. Authorization: <tokenType> 12345678
    });

    console.log('info', 'Registered auth strategy: jwt');

    // Default authentication
    server.auth.default('jwt');

    server.route(Routes.api);

    console.log('info', 'Routes registered');

    // Start your server after plugin registration
    server.start((err) => {

        if (err) {
            console.log('error', 'failed to start server');
            console.log('error', err);

            throw err;
        }

        initDb(() => {

            console.log(`Server running at: ${server.info.uri}`);

        });

    });

});
