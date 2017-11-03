'use strict';

const Hapi      = require('hapi');
const _         = require('lodash');
const server    = new Hapi.Server(); // Create a server with a host and port
const Config    = require('../config/app'); // Config app
const Routes    = require('../routes/api'); // Add the route
const Lab       = require('lab');
const lab       = exports.lab = Lab.script();
const Code      = require('code');

//Server Config
server.connection(_.pick(Config, ['host', 'port', 'Routes'])); //Server Config

server.route(Routes);

const Server = server;

lab.experiment('API Tests', () => {

    // tests
    lab.test('GET / (index)', (done) => {

        const options = {
            method: 'GET',
            url: '/'
        };
        // server.inject lets you simulate an http request
        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result).to.include({ name: 'hapi-starter', version: '1.0.0' }); // Expect result to be "Hello Timmy!" (12 chars long)
            Server.stop(done);  // done() callback is required to end the test.
        });
    });
});


