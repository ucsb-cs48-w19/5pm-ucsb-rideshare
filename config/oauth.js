var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    consumerKey: "991786945525-bbgk5uf02crusqoqvfafvojq8n1qg1sq.apps.googleusercontent.com",
    consumerSecret: "_H7REb5_6JFeq0nZRIm-nPY7",
    callbackURL: "https://ucsb-rideshare-w19.herokuapp.com/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));