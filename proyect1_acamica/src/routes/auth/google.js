const express = require('express');
const passport = require('passport');
const session = require('express-session');
const strategy_name = 'google';
const SESSION_SECRET = 'cats'

const router = express.Router();
router.use(session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());


router.get('/auth', 
    passport.authenticate(strategy_name, {scope: ['profile', 'email']})
);

router.get('/callback', 
    passport.authenticate(strategy_name, {
        failureRedirect: '/failed',
    }),
    function(req, res) {
        console.log(`Peticion Get ${strategy_name}/callback`);
    
        // obtener los datos de google
        const data = req.user._json;
        res.send(data);
});

module.exports = router;