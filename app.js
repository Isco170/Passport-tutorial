const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//conect to mongoDB
mongoose.connect(keys.mongoDb.dbURI, () =>{
    console.log('connected to mongodb');
})

//create home route
app.get('/', (req, res) =>{
    res.render('home');
});

app.use('/auth',authRoutes);



app.listen(3000, () =>{
    console.log('App now listening for requests on port 3000');
});