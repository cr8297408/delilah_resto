const EstadoPedido = require('../models/estadosPedidos.model');
const estadoPedidoSchema = require('../Schemas/estadoPedidos.Schema');

const agregarEstado = async (req, res) => {
    const {  estado, descripcion } = await estadoPedidoSchema.validateAsync(req.body);
    const validarEstado = await EstadoPedido.findOne({ estado });
    if (!validarEstado) {
        const nuevoEstado = await new EstadoPedido({ estado, descripcion });
        nuevoEstado.save();
        res.status(201).json(nuevoEstado);
    } else {
        res.json('el estado ya existe')
    }
};

const obtenerEstados = async (req, res) => {
    const estados = await EstadoPedido.find();
    res.json(estados);
};

const actualizarEstado = async (req, res) => {
    const id = req.params.id;
    const { estado, descripcion } = req.body;
    const validarExistencia = await EstadoPedido.findById(id);
    if (validarExistencia) {
        if (descripcion) {
            validarExistencia.estado = estado;
            validarExistencia.descripcion = descripcion;
            await validarExistencia.save();
            res.status(200).json(validarExistencia);
        } else {
            validarExistencia.estado = estado;
            await validarExistencia.save();
            res.status(200).json(validarExistencia);
        }
    } else {
        res.status(400).json('el estado no existe');
    }
};

const eliminarEstado = async (req, res) => {
    try {
        const idEstado = req.params.idEstado;
        const estadoEliminar = await EstadoPedido.findByIdAndDelete(idEstado);
        if (estadoEliminar) {
        res.status(200).json(estadoEliminar);
        }    
    } catch (error) {
        res.json(error)
    }
};

const estado = {};

estado.agregarEstado = agregarEstado;
estado.obtenerEstados = obtenerEstados;
estado.actualizarEstado = actualizarEstado;
estado.eliminarEstado = eliminarEstado;

module.exports = estado;
