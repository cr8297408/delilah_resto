const Producto = require('../models/productos.model');
const productoSchema = require('../Schemas/productos.Schema');

const obtenerProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
};

const agregarProducto = async (req, res) => {
    try {
        const {
            nombreProducto,
            precio,
            descripcion,
        } = await productoSchema.validateAsync(req.body);
        const validarProducto = await Producto.findOne({ nombreProducto });
        if (validarProducto) {
            res.json('el producto ya existe en la base de datos');
        } else {
            const productoNuevo = new Producto({
                nombreProducto,
                precio,
                descripcion,
            });
            if (!descripcion) {
                await productoNuevo.save();
                res.json('producto agregado, tal vez quieras agregar una descripcion mas adelante para tus usuarios');
            } else {
                await productoNuevo.save();
                res.json(productoNuevo);
            }
        }
    } catch (error) {
        res.json(error.details[0].message);
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombreProducto, precio, descripcion } = req.body;
        const validarNombre = await Producto.findOne({ nombreProducto });
        if (!validarNombre) {
            if (nombreProducto) {
                if (precio) {
                    const options = { new: true };
                    const result = await Producto.findByIdAndUpdate(id, { nombreProducto, precio, descripcion }, options);
                    res.json(result);
                } else { res.status(400).json('el precio se debe de enviar'); }
            } else { res.status(400).json('el nombre del producto se debe de enviar'); }
        } else { res.status(400).json('el nombre del producto ya está registrado en la BD'); }
    } catch (error) {
        res.status(400).json(error);
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const idProducto = req.params.idProducto;
        await Producto.findByIdAndDelete(idProducto);
        res.json('producto eliminado');
    } catch (error) {
        res.status(400).json('el producto no existe');
    }
};

const product = {};

product.agregarProducto = agregarProducto;
product.obtenerProductos = obtenerProductos;
product.actualizarProducto = actualizarProducto;
product.eliminarProducto = eliminarProducto;

module.exports = product;
