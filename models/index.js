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
