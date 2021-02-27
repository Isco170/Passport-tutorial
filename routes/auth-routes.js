const router = require('express').Router();
const passport = require('passport');

// auth login

router.get('/login', (req, res) =>{
    res.render('login');
});

router.get('/logout', (req, res) =>{
    res.send('Logging out');
})
// auth with google

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google redirect to

router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
    res.send('You reached the callback url');
})

module.exports = router;