'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        url: 'https://soundclout.s3.amazonaws.com/Daylight.mp3',
        title: 'Daylight',
        artist: 'Watchhouse',
        awsTitle: 'Daylight.mp3',
        description: 'Man this song is so chill',
        caption: '',
        genreId: 13,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Diamonds & Gasoline',
        artist: 'Turnpike Trabadours',
        url: 'https://soundclout.s3.amazonaws.com/Diamonds+%26+Gasoline.mp3',
        awsTitle: 'Diamonds+%26+Gasoline.mp3',
        description: 'Country throwback',
        caption: '',
        genreId: 5,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Rose Pink Cadillac',
        artist: 'Dope Lemon',
        url: 'https://soundclout.s3.amazonaws.com/DOPE+LEMON+-+ROSE+PINK+CADILLAC.mp3',
        awsTitle: 'DOPE+LEMON+-+ROSE+PINK+CADILLAC.mp3',
        description: 'Dope Lemons hit new song!',
        caption: '',
        genreId: 16,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'Sure Thing',
        artist: 'Lil Wayne',
        url: 'https://soundclout.s3.amazonaws.com/Lil+Wayne+-+Sure+Thing+(Sorry+4+The+Wait).mp3',
        awsTitle: 'Lil+Wayne+-+Sure+Thing+(Sorry+4+The+Wait).mp3',
        description: 'My Favorite Lil Wayne song',
        caption: '',
        genreId: 14,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'Flex',
        artist: 'Piff Marti',
        url: 'https://soundclout.s3.amazonaws.com/Piff+Marti+%26+7ak+-+FLEX.mp3',
        awsTitle: 'Piff+Marti+%26+7ak+-+FLEX.mp3',
        description: 'Favorite Piff Marti song ever',
        caption: '',
        genreId: 14,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'Whoa',
        artist: 'Piff Marti',
        url: 'https://soundclout.s3.amazonaws.com/Piff+Marti+%26+Lou+Villa+-+WHOA.mp3',
        awsTitle: 'Piff+Marti+%26+Lou+Villa+-+WHOA.mp3',
        description: 'Another great Piff banger',
        caption: '',
        genreId: 14,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'New Crib',
        artist: 'Piff Marti',
        url: 'https://soundclout.s3.amazonaws.com/Piff+Marti+%26+Viper+Beats+-+NEW+CRIB..mp3',
        awsTitle: 'Piff+Marti+%26+Viper+Beats+-+NEW+CRIB..mp3',
        description: 'Piff Martis newest hit',
        caption: '',
        genreId: 14,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'The Wolves',
        artist: 'Watchhouse',
        url: 'https://soundclout.s3.amazonaws.com/The+Wolves.mp3',
        awsTitle: 'The+Wolves.mp3',
        description: 'A classic from Watchhouse',
        caption: '',
        genreId: 13,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Fire - Waxahatchee',
        artist: 'Waxahatchee',
        url: 'https://soundclout.s3.amazonaws.com/Waxahatchee-Fire.mp3',
        awsTitle: 'Waxahatchee-Fire.mp3',
        description: 'My favorite Waxahatchee song',
        caption: '',
        genreId: 13,
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
