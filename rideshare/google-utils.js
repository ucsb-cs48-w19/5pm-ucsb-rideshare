const GoogleStrategy = require('passport-google-    oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "999606796533-aup421ai4u7vd28r660in2r8rgcdov7d.apps.googleusercontent.com",
            clientSecret: "JXf3VdQUOSGVaz7356pi8N8Z",
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};