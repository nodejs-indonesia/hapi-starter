'use strict';

const Models        = require('../models');
const Boom          = require('boom');
const EventEmitter  = require('events');
const notifier      = new EventEmitter().setMaxListeners(0);

module.exports = {

    /*
    |--------------------------------------------------------------------------
    | User Routes
    |--------------------------------------------------------------------------
    */

    notifier,

    listUser: (request, reply) => {

        Models.User.findAndCountAll().then((user) => {

            if (!user) {
                reply(Boom.notFound('User does not exist.'));
            }

            notifier.emit('ListUser', user);

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
