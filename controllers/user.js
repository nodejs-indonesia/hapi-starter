'use strict';

const Models = require('../models');
const Boom = require('boom');

module.exports = {

    /*
    |--------------------------------------------------------------------------
    | User Routes
    |--------------------------------------------------------------------------
    */

    listUser: (request, reply) => {

        Models.User.findAndCountAll().then((user) => {

            if (!user) {
                reply(Boom.notFound('User does not exist.'));
            }

            reply({
                statusCode: 200,
                total: user.count,
                data: user.rows
            }).code(200);

        }).catch((err) => {

            reply(err);

        });
    }

};
