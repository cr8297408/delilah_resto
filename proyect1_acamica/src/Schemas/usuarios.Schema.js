const Joi = require('joi');

const usuarioSchema = Joi.object({
    usuario: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    nombre: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } })
        .required(),

    telefono: Joi.string()
        .min(10)
        .max(12)
        .required(),

    direccion: Joi.string(),

    contrasenia: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    repetir_contrasenia: Joi.ref('contrasenia'),

    access_token: [
        Joi.string(),
        Joi.number(),
    ],

    isAdmin: Joi.boolean(),
})
    .xor('contrasenia', 'access_token')
    .with('contrasenia', 'repetir_contrasenia');

module.exports = usuarioSchema;
