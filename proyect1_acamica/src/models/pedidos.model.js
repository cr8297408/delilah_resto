const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    idUsuario: String,
    productos: [
        {
            nombreProducto: {
                type: String,
                required: true,
            },
            cantidad: {
                type: Number,
                default: 1,
            },
        },
    ],
    direccion: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    medioPago: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        default: 'pendiente',
    },
    precioTotal: {
        type: Number,
    },
});

module.exports = new mongoose.model('Pedido', pedidoSchema);
