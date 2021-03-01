const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) =>{
    done(null, user);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then((user) =>{
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
    //option for the google 
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    
    }, (accessToken, refreshToken, profile, done) =>{
        console.log(profile);
       User.findOne({googleid : profile.id}).then((currentUser) =>{
            if(currentUser){
                done(null, currentUser)
            }else{
                new User({
                    username: profile.displayName,
                    googleid: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) =>{
                    done(null, newUser);
                })
            }
       })
    })
)
