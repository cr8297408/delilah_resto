const mongoose = require('mongoose');

const estadoPedidoSchema = new mongoose.Schema({
    estado: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model('EstadoPedido', estadoPedidoSchema);