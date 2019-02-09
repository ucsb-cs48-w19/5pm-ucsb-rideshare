var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "991786945525-bbgk5uf02crusqoqvfafvojq8n1qg1sq.apps.googleusercontent.com",
    clientSecret: "_H7REb5_6JFeq0nZRIm-nPY7",
    callbackURL: "https://ucsb-rideshare-w19.herokuapp.com/callback"
  },
  function(token, tokenSecret, profile, done) {
  	done();    
  });
);

module.exports = passport;



