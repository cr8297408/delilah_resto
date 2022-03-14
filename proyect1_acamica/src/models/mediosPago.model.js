const mongoose = require('mongoose');

const mediosPagoSchema = new mongoose.Schema({
    nombreMedioPago: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
});

module.exports = new mongoose.model('MedioPago', mediosPagoSchema);
