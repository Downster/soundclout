'use strict';
const bcrypt = require("bcryptjs");
const password = "Password123!";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return bcrypt.hash(password, 10).then((password) => {
      return queryInterface.bulkInsert('Users', [
        {
          username: 'Bob Dole',
          email: 'bob@dole.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Beat Lord69',
          email: 'beat@lord.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'John Dangle',
          email: 'john@dangle.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'RollerSkates',
          email: 'roller@skates.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'MusicSnob55',
          email: 'musixx@musix.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ])


      down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
      }
    })
  }
}
