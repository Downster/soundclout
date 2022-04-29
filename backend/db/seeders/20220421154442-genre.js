'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      {
        name: 'None'
      },
      {
        name: 'Alternative Rock'
      },
      {
        name: 'Ambient'
      },
      {
        name: 'Classical'
      },
      {
        name: 'Country'
      },
      {
        name: 'Dance & EDM'
      },
      {
        name: 'Dancehall'
      },
      {
        name: 'Deep House'
      },
      {
        name: 'Disco'
      },
      {
        name: 'Drum & Bass'
      },
      {
        name: 'Dubstep'
      },
      {
        name: 'Electronic'
      },
      {
        name: 'Folk & Singer-Songwriter'
      },
      {
        name: 'Hip-hop & Rap'
      },
      {
        name: 'House'
      },
      {
        name: 'Indie'
      },
      {
        name: 'Jazz & Blues'
      },
      {
        name: 'Latin'
      },
      {
        name: 'Metal'
      },
      {
        name: 'Piano'
      },
      {
        name: 'Pop'
      },
      {
        name: 'R&B & Soul'
      },
      {
        name: 'Reggae'
      },
      {
        name: 'Reggaeton'
      },
      {
        name: 'Rock'
      },
      {
        name: 'Soundtrack'
      },
      {
        name: 'Techno'
      },
      {
        name: 'Trance'
      },
      {
        name: 'Triphop'
      },
      {
        name: 'World'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
    }, {});
  }
};