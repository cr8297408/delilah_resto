const MedioPago = require('../models/mediosPago.model');
const medioPagoSchema = require('../Schemas/mediosPago.Schema');

const obtenerMediosPago = async (req, res) => {
    try {
        const mediosPago = await MedioPago.find();
        res.json(mediosPago);
    } catch (error) {
        res.json(error);
    }
};

const agregarMedioPago = async (req, res) => {
    try {
        const { nombreMedioPago, descripcion } = await medioPagoSchema.validateAsync(req.body);
        const validarMedioPago = await MedioPago.findOne({ nombreMedioPago });
        if (!validarMedioPago) {
            if (!descripcion) {
                const medioPagoNuevo = new MedioPago({ nombreMedioPago, descripcion });
                await medioPagoNuevo.save();
                res.send({ medioPagoNuevo, msg: 'tal vez quieras agg su descripcion' });
            } else {
                const medioPagoNuevo = new MedioPago({ nombreMedioPago, descripcion });
                await medioPagoNuevo.save();
                res.json(medioPagoNuevo);
            }
        } else {
            res.json('el medio de pago ya existe en la BD');
        }
    } catch (error) {
        res.json(error.details[0].message);
    }
};

const actualizarMedioPago = async (req, res) => {
    try {
        const idMedioPago = req.params.idMedioPago;
        const { nombreMedioPago, descripcion } = req.body;
        if (nombreMedioPago && descripcion) {
            const medioPagoAct = await MedioPago.findById(idMedioPago);
            if (medioPagoAct) {
                medioPagoAct.nombreMedioPago = nombreMedioPago;
                medioPagoAct.descripcion = descripcion;
                await medioPagoAct.save();
                res.json(medioPagoAct);
            } else {
                res.status(400).json('el medio de pago a actualizar no existe');
            }
        } else {
            res.status(400).json('debes actualizar nombreMedioPago y descripcion');
        }
    } catch (errors) {
        res.json('nombreMedioPago es requerido');
    }
};

const eliminarMedioPago = async (req, res) => {
    try {
        const idMedioPago = req.params.idMedioPago;
        const medioPagoElim = await MedioPago.findByIdAndDelete(idMedioPago);
        res.json(medioPagoElim);
    } catch (error) {
        res.json(error);
    }
}; 

const payments = {};

payments.obtenerMediosPago = obtenerMediosPago;
payments.agregarMedioPago = agregarMedioPago;
payments.actualizarMedioPago = actualizarMedioPago;
payments.eliminarMedioPago = eliminarMedioPago;

module.exports = payments