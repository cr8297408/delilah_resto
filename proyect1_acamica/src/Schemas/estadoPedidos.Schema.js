const Joi = require('joi');

const estadoPedidoSchema = Joi.object({
    estado: Joi.string()
        .required(),
    descripcion: Joi.string()
});

module.exports = estadoPedidoSchema;
