const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    direccion: String,
    contrasenia: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    activo: {
        type: Boolean,
        default: true,
    },
});

module.exports = new mongoose.model('Usuario', usuarioSchema);
