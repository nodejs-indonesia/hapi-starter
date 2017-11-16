'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return queryInterface.bulkInsert('User', [{
            name: 'John Doe',
            email: 'johndoe@mail.com',
            address: 'Jakarta, Indonesia',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Jane Doe',
            email: 'janedoe@mail.com',
            address: 'Bali, Indonesia',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('User', null, {});
    }
};
