'use strict';

/**
 * jwToken
 *
 * @description :: JSON Webtoken Service
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & https://auth0.com/blog/hapijs-authentication-secure-your-api-with-json-web-tokens/
 * @source       : See https://github.com/dwyl/hapi-auth-jwt2
 *
 */

const Jwt = require('jsonwebtoken');
const Config    = require('../config/app'); // Config app

// Generates a token from supplied payload
module.exports.issue = (payload) => {

    return Jwt.sign(
        payload,
        Config.secretKey, { // Token Secret that we sign it with
            algorithm: Config.algorithms,
            expiresIn: Config.expiresIn // Token Expire time
        }
    );

};

// bring your own validation function
module.exports.validate = (decoded, request, callback) => {

    // do your checks to see if the user is valid
    if (!decoded) {
        // console.log('Failed');
        return callback(null, false);
    }
    // console.log('Success');
    return callback(null, true);


};
