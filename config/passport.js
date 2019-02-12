const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const models = require("../models/index.js");

if(!process.env.DATABASE_URL) {
	//We are running on local host and must use the information in a file called 
	// keys.js in the config directory (see the readme about how to create the 
	// keys.js file). 
	var keys = require("./keys");
}

passport.serializeUser(function(user, done) {
	done(null, user.user_id);
});

passport.deserializeUser(function(user_id, done) {
	models.User.findOne({where: {user_id:user_id}})
	.then(function(user) {
		done(null, user);
	})
	.catch(function(err) {
		console.log(err);
	})
});


passport.use(
	new FacebookStrategy({
		clientID: process.env.FACEBOOK_CLIENT_ID || keys.facebook.clientID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET || keys.facebook.clientSecret,
		callbackURL: process.env.FACEBOOK_CALLBACK_URL || keys.facebook.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		models.User.findOrCreate({where: {user_id:profile.id}, defaults: {
			username:profile.username, 
			display_name:profile.displayName,
		}})
		.spread(function(user, created) {
			return done(null, user);
		})

	})
);

module.exports = passport;



