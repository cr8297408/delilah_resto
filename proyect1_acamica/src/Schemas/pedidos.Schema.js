const Joi = require('joi');

const pedidoSchema = Joi.object({
    idUsuario: Joi.string(),
    productos: Joi.array().items({
        nombreProducto: Joi.string()
            .min(7)
            .max(30)
            .required(),
        cantidad: Joi.number()
            .default(1),
    })
        .required(),
    direccion: Joi.string()
        .min(7)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    medioPago: Joi.string()
        .required(),
    estado: Joi.string()
        .max(50)
        .default('pendiente'),
})
    .xor('idUsuario', 'email');

module.exports = pedidoSchema;
