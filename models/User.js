const Sequelize = require("sequelize");
const db = require("../config/database.js");

const User = db.define("user", {
	user_id: {
		type: Sequelize.Sequelize.STRING
	},
	first_name: {
		type: Sequelize.Sequelize.STRING
	}, 
	last_name: {
		type: Sequelize.Sequelize.STRING
	},
	username: {
		type: Sequelize.Sequelize.STRING
	},
	display_name: {
		type: Sequelize.Sequelize.STRING
	}, 
	email: {
		type: Sequelize.Sequelize.STRING
	}
});

module.exports = User;
