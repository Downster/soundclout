'use strict';

const { TimestreamQuery } = require("aws-sdk");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: { model: 'Users' },
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://imgur.com/hdrdJxY.jpg'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      awsTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      caption: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      genreId: {
        allowNull: false,
        references: { model: 'Genres' },
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      private: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};