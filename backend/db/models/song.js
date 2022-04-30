'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    awsTitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    caption: DataTypes.TEXT,
    private: DataTypes.BOOLEAN
  }, {});
  Song.associate = function (models) {
    Song.belongsTo(models.User, { foreignKey: 'userId' })
    Song.hasMany(models.Comment, { foreignKey: 'songId' })
    Song.belongsTo(models.Genre, { foreignKey: 'genreId' })
  };
  return Song;
};