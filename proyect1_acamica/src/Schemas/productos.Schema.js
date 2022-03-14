const Joi = require('joi');

const productoSchema = Joi.object({
    nombreProducto: Joi.string()
        .min(7)
        .max(30)
        .required(),
    precio: Joi.number()
        .required(),
    descripcion: Joi.string(),
});

module.exports = productoSchema;
