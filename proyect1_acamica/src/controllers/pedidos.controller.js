const pedidoSchema = require('../Schemas/pedidos.Schema');

const Pedido = require('../models/pedidos.model');
const MedioPago = require('../models/mediosPago.model');
const Producto = require('../models/productos.model');
const Usuario = require('../models/usuarios.model');
const EstadoPedido = require('../models/estadosPedidos.model');

const obtenerPedidos = async (req, res) => {
    const email = req.params.email;
    const pedidoPorUsuario = await Pedido.find({ email });
    res.json(pedidoPorUsuario);
};

const agregarPedido = async (req, res) => {
    const { productos, direccion, email, medioPago, estado } = await pedidoSchema.validateAsync(req.body);
    const productosValidados = [];
    const productosNoValidados = [];
    for (let producto = 0; producto < productos.length; producto++) {
        const objetoProducto = productos[producto];
        const nombreProducto = objetoProducto.nombreProducto;
        const validarProducto = await Producto.findOne({ nombreProducto });
        if (validarProducto) {
            productosValidados.push(validarProducto);
        } else {
            productosNoValidados.push(nombreProducto);
        }
    };
    if (productosValidados.length === productos.length){
        const validarMedioPago = await MedioPago.findOne({ nombreMedioPago: medioPago });
        if (validarMedioPago) {
            const validarEstado = await EstadoPedido.findOne({ estado });
            if (validarEstado) {
                const validarUsuarioEmail = await Usuario.findOne({ email });
                if (validarUsuarioEmail) {
                    let precioTotal = 0;
                    for (let i = 0; i < productos.length; i++) {
                        const cantidad = productos[i].cantidad || 1;
                        const nombreProduct = productos[i].nombreProducto;
                        const producto = await Producto.findOne({ nombreProducto: nombreProduct });
                        const precio = producto.precio * cantidad;
                        precioTotal += precio;
                    }
                    const estadoUsuario = validarUsuarioEmail.activo
                    if (estadoUsuario) {
                        const pedidoNuevo = new Pedido({
                            productos,
                            direccion,
                            email,
                            medioPago,
                            estado,
                            precioTotal,
                        });
                        await pedidoNuevo.save();
                        res.json(pedidoNuevo);
                    } else {
                        res.status(401).json('el usuario está suspendido del sistema');
                    }
                } else {
                    res.status(400).send({ msg: 'el correo no pertenece a un usuario del sistema', email })
                }
            } else {
                res.status(400).send({ msg: 'el estado no existe en la BD', estado })
            }
        } else {
            res.status(400).send({ msg: 'el siguiente medio de pago no exise', medioPago });
        }
    } else {
        res.status(400).send({ msg: 'los productos no existen en la bd,', productosNoValidados })
    }
};

const obtenerPedidosUsuario = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        res.send(error)
    }
};

const actualizarPedido = async (req, res) => {
    try {
        const idPedido = req.params.idPedido;
        const { estado } = req.body;
        const pedidoActualizar = await Pedido.findById(idPedido);
        pedidoActualizar.estado = estado;
        await pedidoActualizar.save();
        res.json(pedidoActualizar);
    } catch (error) {
        res.json(error);
    }
};

const eliminarPedido = async (req, res) => {
    const idPedido = req.params.idPedido;
    const result = await Pedido.findByIdAndDelete(idPedido);
    res.json(result);
};

const order = {};

order.obtenerPedidos = obtenerPedidos;
order.agregarPedido = agregarPedido;
order.obtenerPedidosUsuario = obtenerPedidosUsuario;
order.actualizarPedido = actualizarPedido;
order.eliminarPedido = eliminarPedido;

module.exports = order;
