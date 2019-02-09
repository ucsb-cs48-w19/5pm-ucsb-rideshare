const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
	username: {
		Sqeuelize.Sequelize.STRING
	},
	nickname: {
		Sqeuelize.Sequelize.STRING
	},
	access_token: {
		Sqeuelize.Sequelize.STRING
	},
	oauth_id: {
		Sqeuelize.Sequelize.INTEGER
	},

});