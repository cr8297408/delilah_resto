const Joi = require('joi');

const medioPagoSchema = Joi.object({
    nombreMedioPago: Joi.string()
        .min(5)
        .required(),
    descripcion: Joi.string(),
});

module.exports = medioPagoSchema;
