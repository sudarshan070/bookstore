var passport = require("passport")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
var User = require("../models/users")

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // console.log(profile)
        let newAdmin = {
            email: profile.emails[0].value,
            googleId: profile.id,
            name: profile.displayName
        }
        User.findOneAndUpdate({ email: profile.emails[0].value },
            newAdmin,
            { upsert: true },
            function (err, user) {
                return done(err, user)
            }
        )
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});