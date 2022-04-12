const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcrypt = require('bcrypt');

const strategy_name = 'google';
const config = require('../config');
const Usuario = require('../models/usuarios.model');

const GOOGLE_CLIENT_ID = config.google.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = config.google.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK = config.google.GOOGLE_CALLBACK;

passport.use(strategy_name, new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    //passReqToCallback: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // buscar usuario
    let user = await Usuario.findOne({email: profile.emails[0].value});
    if(user){
        done(null, user);
    } else {
        try {
            const newUser = {
                nombre: profile.name.givenName,
                email: profile.emails[0].value,
                isAdmin: false,
                usuario: profile.username,
                contrasenia: bcrypt.hashSync(profile.id, 10)
            }
            let usuarioNuevo = new Usuario(newUser);
            const usuarioCreado = await usuarioNuevo.save();
            done(null, user);
        } catch (error) {
            res.json('algo salió mal.... ');
        }
    }


  }
));

passport.serializeUser((user, done) => {
    //En este caso serializamos el username, pero es preferente usar el _id
   done(null, user.id);
});

passport.deserializeUser((username, done) => {
  // Para este ejemplo estamos pasando el objeto User directamente
   done(null, user);
});