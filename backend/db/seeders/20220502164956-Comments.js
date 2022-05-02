'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        songId: 1,
        time: 40.55,
        body: 'soooooo sick!!!!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        songId: 1,
        time: 10.00,
        body: 'woah, so rad!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        songId: 1,
        time: 68.00,
        body: 'very nice!',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {});
  }
};
