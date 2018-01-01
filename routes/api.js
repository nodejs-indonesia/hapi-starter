'use strict';

const Controllers = require('../controllers');
// const Validation    = require('../validation');
const Pkg = require('../package.json');
const apiUrl = '/api/v1';

module.exports = [{
    method: 'GET',
    path: apiUrl,
    config: {
        auth: false
    },
    handler: (request, reply) => {

        return reply({
            name: Pkg.name,
            version: Pkg.version
        });

    }
},

{ method: 'POST',  path: apiUrl + '/auth/register', config: { auth: false }, handler: Controllers.auth.register },
{ method: 'POST',  path: apiUrl + '/auth/login',    config: { auth: false }, handler: Controllers.auth.login },
{ method: 'GET',   path: apiUrl + '/users',         config: { auth: false }, handler: Controllers.user.listUser }

];
