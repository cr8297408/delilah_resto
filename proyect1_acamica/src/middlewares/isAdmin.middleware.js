const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarios.model');
const configs = require('../config.js');

const isAdmin = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (token) {
        const decoded = await jwt.verify(token, configs.security.JWT_SECRET);
        if (decoded) {
            if (decoded.isAdmin === true) {
                next()
            } else {
                res.status(401).json('usuario no admin');
            }
        }
}};

module.exports = isAdmin