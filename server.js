'use strict';

const Hapi      = require('hapi');
// const Path   = require('path');
const _         = require('lodash');
const JwToken   = require('./plugins/jwToken'); // bring your own validation function
const server    = new Hapi.Server(); // Create a server with a host and port
const Config    = require('./config/app'); // Config app
const Routes    = require('./routes'); // Add the route
const Plugins   = require('./plugins'); // Load Plugins

// Server Config
server.connection(_.pick(Config, ['host', 'port', 'routes', 'labels']));
server.connection({ port: process.env.WEBSOCKET_PORT, labels: ['websocket'] });

// Export the server to be required elsewhere.
module.exports = server;

server.register(Plugins, (err) => {

    if (err) {
        console.log('error', 'failed to install Plugins');
        console.log(err);
        throw err;
    }

    console.log('Info:', 'Plugins registered');

    server.auth.strategy('jwt', 'jwt', {
        key: Config.secretKey, // Never Share your secret key
        // key: Buffer('<Your Base64 encoded secret key>', 'base64'), // Using Base64 encoded secret keys
        validateFunc: JwToken.validate, // validate function defined above
        verifyOptions: {
            algorithms: [Config.algorithms]
        }, // pick a strong algorithm
        tokenType: Config.tokenType // Allow custom token type, e.g. Authorization: <tokenType> 12345678
    });

    console.log('Info:', 'Registered auth strategy: jwt');

    // Default authentication
    server.auth.default('jwt');

    server.route(Routes.api);

    console.log('Info:', 'Routes registered');

    // Start your server after plugin registration
    server.start((err) => {

        if (err) {
            console.log('error', 'failed to start server');
            console.log('error', err);

            throw err;
        }

        console.log('Info:', `Server running at: ${server.select('app').info.uri}`);

    });

});
