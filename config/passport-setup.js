const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then((user) =>{
        done(null, user.id);
    })
});

passport.use(
    new GoogleStrategy({
    //option for the google 
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    
    }, (accessToken, refreshToken, profile, done) =>{
       User.findOne({googleid : profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log('User is: ' + currentUser);
                done(null, currentUser)
            }else{
                new User({
                    username: profile.displayName,
                    googleid: profile.id
                }).save().then((newUser) =>{
                    console.log('new User created: ' + newUser);
                    done(null, newUser);
                })
            }
       })
    })
)
