const expressjwt = require('express-jwt');

const configs = require('./config');

const JWT_SECRET = configs.security.JWT_SECRET;
const JWT_ALGORITHMS = configs.security.JWT_ALGORITHMS;

const expressJWT = expressjwt({
    secret: JWT_SECRET,
    algorithms: [JWT_ALGORITHMS],
}).unless({
    path: [ '/usuarios/login', '/usuarios/registro', '/', '/health-check' ],
});

module.exports = expressJWT;
