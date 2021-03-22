const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Artist model
class Artist extends Model {}

// create fields/columns for Artist model
Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Artist",
  }
);

module.exports = Artist;
