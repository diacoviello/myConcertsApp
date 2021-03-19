const User = require("./User");
const Event = require("./Event");

User.hasMany(Event, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Event,
};

// const User = require("./User");
// const Event = require("./Event");
// const Artist = require("./Artist");

// User.belongsToMany(Artist, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: Event,
//     unique: false,
//   },
// });

// Artist.belongsToMany(User, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: Event,
//     unique: false,
//   },
// });

// module.exports = { User, Artist, Event };
