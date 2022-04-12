const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const strategy_name = 'google';
const config = require('../config');

const GOOGLE_CLIENT_ID = config.google.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = config.google.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK = config.google.GOOGLE_CALLBACK;

passport.use(strategy_name, new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    //En este caso serializamos el username, pero es preferente usar el _id
   done(null, user);
});

passport.deserializeUser((username, done) => {
  // Para este ejemplo estamos pasando el objeto User directamente
   done(null, user);
}); 