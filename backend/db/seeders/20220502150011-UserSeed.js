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
          imageUrl: 'https://soundclout.s3.amazonaws.com/kevin.jpeg',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Beat Lord69',
          imageUrl: 'https://imgur.com/hdrdJxY.jpg',
          email: 'beat@lord.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Dan Keta',
          imageUrl: 'https://soundclout.s3.amazonaws.com/hoseguy.jpg',
          email: 'john@dangle.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'RollerSkates',
          imageUrl: 'https://soundclout.s3.amazonaws.com/kevin.jpeg',
          email: 'roller@skates.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'MusicSnob55',
          imageUrl: 'https://soundclout.s3.amazonaws.com/kevin.jpeg',
          email: 'musixx@musix.com',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Demo Dan',
          imageUrl: 'https://imgur.com/hdrdJxY.jpg',
          email: 'demo@user.io',
          hashedPassword: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Leos Vest',
          imageUrl: 'https://www.stokesskis.com/wp-content/uploads/2017/10/redevojune.jpg',
          email: 'leo@joon.io',
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
