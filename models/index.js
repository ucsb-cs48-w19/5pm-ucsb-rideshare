const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Ride = require("./Ride.js");
const User = require("./User.js");

const models = {
	User:User,
	Ride:Ride
}

Ride.belongsTo(User, {
	foreignKey: "owner"
});

models.db = db;
models.Sequelize = Sequelize;

module.exports = models;



