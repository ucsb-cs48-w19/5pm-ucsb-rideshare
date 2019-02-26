const Sequelize = require("sequelize");
const db = require("../config/database");

const Ride = db.define("ride", {
	name: {
		type: Sequelize.Sequelize.STRING
	},
	contact_email: {
		type: Sequelize.Sequelize.STRING
	},
	origin: {
		type: Sequelize.Sequelize.STRING
	},
	destination: {
		type: Sequelize.Sequelize.STRING
	},
	date: {
		type: Sequelize.Sequelize.DATE
	},
	time: {
		type: Sequelize.Sequelize.TIME
	},
	number_of_seats: {
		type: Sequelize.Sequelize.INTEGER
	},
	price: {
		type: Sequelize.Sequelize.STRING
	},
	message: {
		type: Sequelize.Sequelize.STRING
	}, 
});

module.exports = Ride;