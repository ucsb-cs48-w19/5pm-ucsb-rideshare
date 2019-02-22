const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
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
		callbackURL: process.env.FACEBOOK_CALLBACK_URL || keys.facebook.callbackURL,
		profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
	},
	function(accessToken, refreshToken, profile, done) {
		models.User.findOrCreate({where: {user_id:profile.id}, defaults: {
			first_name:profile.name.givenName,
			last_name:profile.name.familyName,
			username:profile.username, 
			display_name:profile.displayName,
			email:profile.emails[0].value,
		}})
		.spread(function(user, created) {
			return done(null, user);
		})

	})
);


passport.use(
	new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID || keys.google.clientID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET || keys.google.clientSecret,
		callbackURL: process.env.GOOGLE_CALLBACK_URL || keys.google.callbackURL
	}, 
	function(token, tokenSecret, profile, done) {
		// note: there could be id conflicts with the facebook id's using this method.
		models.User.findOrCreate({where: {user_id:profile.id}, defaults: {
			first_name:profile.name.givenName,
			last_name:profile.name.familyName,
			username:profile.username, 
			display_name:profile.displayName,
			email:profile.emails[0].value,
		}})
		.spread(function(user, created) {
			return done(null, user);
		})
	})
);



module.exports = passport;



