const Sequelize = require("sequelize");

// Get database info from Heroku
if(process.env.DATABASE_URL) {
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
} else {
	// Running on localhost
	const keys = require("./keys.js");
	module.exports = new Sequelize(keys.localdb.database, keys.localdb.username, keys.localdb.password, {
		host: "localhost",
		dialect: "postgres", 
		operatorsAliases: false,

		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
	});
}









