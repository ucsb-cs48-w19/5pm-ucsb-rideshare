const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Ride = require("./Ride.js");
const User = require("./User.js");

const models = {
	User:User,
	Ride:Ride
}

// Associations
// calling belogsTo() gives Ride a field of userId
Ride.belongsTo(User, {
	foreignKey:{
		name: "userId",
		allowNull: false,
	}});
User.hasMany(Ride, {
	foreignKey:{
		name: "userId",
		allowNull: false,
	}});


models.db = db;
models.Sequelize = Sequelize;

module.exports = models;



