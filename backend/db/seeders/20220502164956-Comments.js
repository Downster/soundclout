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
      {
        userId: 3,
        songId: 2,
        time: 25.00,
        body: 'This got me out of the hole',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        songId: 2,
        time: 70.00,
        body: 'Dan Keta is a nerd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songId: 2,
        time: 80.00,
        body: 'Okay, yall cool it. This song is sweet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        songId: 3,
        time: 25.00,
        body: 'Soooooo smoooth',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songId: 3,
        time: 60.00,
        body: 'Cant get enough of this guy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        songId: 3,
        time: 90.00,
        body: 'Love it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        songId: 4,
        time: 10.00,
        body: 'This guy sounds like a burnout',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        songId: 4,
        time: 43.22,
        body: 'YO DAN youre just jealous',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        songId: 4,
        time: 90.00,
        body: 'Still a great song',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {});
  }
};
