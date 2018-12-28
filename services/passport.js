const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { done(null, user.id)});
passport.deserializeUser((id, done) => { 
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if(existingUser){
                //already present user
                done(null, existingUser);
            }
            else {
                new User ({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0],
                    gender: profile.gender
                })
                .save()
                .then(user => done(null, user));
            }   
        })


}));