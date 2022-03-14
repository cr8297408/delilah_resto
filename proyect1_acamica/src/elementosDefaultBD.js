const bcrypt = require('bcrypt');
const Usuario = require('./models/usuarios.model');
const Producto = require('./models/productos.model');
const Pedido = require('./models/pedidos.model');
const MedioPago = require('./models/mediosPago.model');
const EstadoPedido = require('./models/estadosPedidos.model');


// usuarios por defecto
(async () => {
    const buscarUsuario = await Usuario.findOne();
    if (!buscarUsuario) {
        const usuarioAdmin = new Usuario({
            usuario: 'usuarioAdmin',
            nombre: 'admin inicial',
            email: 'admin@gmail.com',
            telefono: '3133333333',
            direccion: 'direccion usuario1',
            contrasenia: bcrypt.hashSync('12345', 10),
            isAdmin: true,
        });
        await usuarioAdmin.save();
        
        const usuario1 = new Usuario({
            usuario: 'usuario1',
            nombre: 'nombre de usuario1',
            email: 'emailusuario1@gmail.com',
            telefono: '3133333333',
            direccion: 'direccion usuario1',
            contrasenia: bcrypt.hashSync('contraseniaUsser1', 10),
        });
        await usuario1.save();

        const usuario2 = new Usuario({
            usuario: 'usuario2',
            nombre: 'nombre de usuario2',
            email: 'emailusuario2@gmail.com',
            telefono: '3133333333',
            direccion: 'direccion usuario2',
            contrasenia: bcrypt.hashSync('contraseniaUsser2', 10),
        });
        await usuario2.save();

        const usuario3 = new Usuario({
            usuario: 'usuario3',
            nombre: 'nombre de usuario3',
            email: 'emailusuario3@gmail.com',
            telefono: '3133333334',
            direccion: 'direccion usuario3',
            contrasenia: bcrypt.hashSync('contraseniaUsser3', 10),
        });
        await usuario3.save();
    };
})();

// productos por defecto
(async () => {
    const buscarProducto = await Producto.findOne();
    if (!buscarProducto) {
        const hamburguesa = new Producto({
            nombreProducto: 'hamburguesa simple',
            precio: 8000,
            descripcion: 'hamburguesa de carne simple',
        });
        await hamburguesa.save();

        const cocaCola = new Producto({
            nombreProducto: 'coca cola',
            precio: 2000,
            descripcion: 'coca cola personal',
        });
        await cocaCola.save();

        const jugoHit = new Producto({
            nombreProducto: 'jugo hit',
            precio: 1800,
            descripcion: 'jugo hit personal',
        });
        await jugoHit.save();

        const salchipapaDoble = new Producto({
            nombreProducto: 'salchipapa doble',
            precio: 10000,
            descripcion: 'salchipapa para dos personas...',
        });
        await salchipapaDoble.save();
    }
})();

// pedidos por defecto

(async () => {
    const buscarPedido = await Pedido.findOne();
    if (!buscarPedido) {
        const pedido1 = new Pedido({
            productos: [
                {
                    nombreProducto: 'salchipapaDoble',
                    cantidad: 2,
                },
                {
                    nombreProducto: 'coca cola',
                    cantidad: 2,
                }
            ],
            direccion: 'direccion1 para pruebas',
            email: 'emailusuario1@gmail.com',
            medioPago: 'efectivo',
        });
        await pedido1.save();

        const pedido2 = new Pedido({
            productos: [
                {
                    nombreProducto: 'hamburguesa simple',
                },
                {
                    nombreProducto: 'coca cola',
                }
            ],
            direccion: 'direccion2 para pruebas',
            email: 'emailusuario2@gmail.com',
            medioPago: 'datafono',
        });
        await pedido2.save();

        const pedido3 = new Pedido({
            productos: [
                {
                    nombreProducto: 'salchipapaDoble',
                    cantidad: 2,
                },
                {
                    nombreProducto: 'jugo hit',
                    cantidad: 2,
                }
            ],
            direccion: 'direccion3 para pruebas',
            email: 'emailusuario1@gmail.com',
            medioPago: 'efectivo',
        });
        await pedido3.save();

        const pedido4 = new Pedido({
            productos: [
                {
                    nombreProducto: 'hamburguesa',
                },
                {
                    nombreProducto: 'coca cola',
                    cantidad: 2,
                }
            ],
            direccion: 'direccion4 para pruebas',
            email: 'emailusuario3@gmail.com',
            medioPago: 'datafono',
        });
        await pedido4.save();
    }
})();

// medios de pago por defecto

(async () => {
    const buscarMedioPago = await MedioPago.findOne();
    if (!buscarMedioPago) {
        const efectivo = new MedioPago({
            nombreMedioPago: 'efectivo',
            descripcion: 'pago en efectivo',
        });
        await efectivo.save();

        const datafono = new MedioPago({
            nombreMedioPago: 'datafono',
            descripcion: 'pago contraentrega por datafono contargeta',
        });
        await datafono.save();
    }
})();

// estados de los pedidos por defecto

(async () => {
    const buscarEstado = await EstadoPedido.findOne();
    if (!buscarEstado) {
        const pendiente = new EstadoPedido({
            estado: 'pendiente',
            descripcion: 'estado por defecto',
        });
        await pendiente.save();

        const enPreparacion = new EstadoPedido({
            estado: 'en preparacion',
            descripcion: 'el pedido se está preparando',
        });
        await enPreparacion.save();

        const enCamino = new EstadoPedido({
            estado: 'en proceso de enrega',
            descripcion: 'el pedido se está entregando',
        });
        await enCamino.save();
    }
})();
