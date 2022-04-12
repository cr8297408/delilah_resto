const express = require('express');
const passport = require('passport');
const session = require('express-session');
const jsonwebtoken = require('jsonwebtoken');
const { config } = require('dotenv');
config();

const JWT_SECRET = process.env.JWT_SECRET;

const strategy_name = 'google';
const SESSION_SECRET = 'cats'

const router = express.Router();
router.use(session({ secret: SESSION_SECRET,}));
router.use(passport.initialize());
router.use(passport.session());


router.get('/auth', 
    passport.authenticate(strategy_name, {scope: ['profile', 'email']})
);

router.get('/callback', 
    passport.authenticate(strategy_name, {
        failureRedirect: '/google/auth',
    }),
    function(req, res) {
        console.log(`Peticion Get ${strategy_name}/callback`);
    
        // obtener los datos de google
        const {nombre, email, isAdmin, usuario} = req.user;

        const token = jsonwebtoken.sign({
            nombre,
            usuario,
            isAdmin,
        }, JWT_SECRET);
        console.log(token);
        console.log({nombre, email, isAdmin, usuario});
        res.redirect('http://localhost:3000/api-docs?token='+token);
});

module.exports = router;