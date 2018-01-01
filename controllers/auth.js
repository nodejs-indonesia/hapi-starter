'use strict';

const Models    = require('../models');
const Bcrypt    = require('bcrypt');
const Boom      = require('boom');
const JwToken   = require('../plugins/jwToken');
const Sequelize = require('sequelize');

module.exports = {

    register: (request, reply) => {

        const attributes = request.payload;

        Models.User.create(attributes).then((userCreated) => {

            return reply({
                statusCode: 200,
                data: userCreated
            }).code(200);

        }).catch(Sequelize.ValidationError, (err) => {

            // respond with validation errors
            return reply({
                statusCode: 400,
                error: 'Bad Request',
                message: err.errors[0].message
            }).code(400);

        }).catch((err) => {

            console.log(err);
            return reply(err);

        });

    },

    login: (request, reply) => {

        const email = request.payload.email;
        const password = request.payload.password;

        Models.User.findOne({
            where: {
                email
            }
        }).then((user, err) => {

            if (!user) {
                return reply(Boom.notFound('Sorry, Account not found!'));
            }

            // Load hash from your password DB.
            Bcrypt.compare(password, user.password, (err, valid) => {

                if (err) {
                    return reply(err);
                }

                if (!err && valid) {

                    reply({
                        statusCode: 200,
                        data: user,
                        secretToken: JwToken.issue({
                            user
                        })
                    }).code(200);

                }
                else {
                    return reply(Boom.unauthorized('Invalid email or password'));
                }
            });
        }).catch((err) => {

            return reply(err);

        });
    }

};
