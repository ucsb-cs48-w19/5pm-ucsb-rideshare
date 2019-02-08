const Sequelize = require("sequelize");

// Get database info from Heroku
module.exports = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres", 
	protocol: "postgres",
	port: 5432,
	host: "<heroku host>",
	logging : true,
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
});