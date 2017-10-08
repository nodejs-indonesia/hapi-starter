'use strict';

const Controllers   = require('../controllers');
const Validation    = require('../validation');
const Pkg           = require('../package.json');
const prefixUrl        = '/';

module.exports = [{
    method: 'GET',
    path: prefixUrl,
    config: {
        auth: false
    },
    handler: (request, reply) => {

        return reply({
            name: Pkg.name,
            version: Pkg.version
        });

    }
}

];
