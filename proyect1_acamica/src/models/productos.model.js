const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombreProducto: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: String,
});

module.exports = new mongoose.model('Producto', productoSchema);
