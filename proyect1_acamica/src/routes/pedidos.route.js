const express = require('express');

const order = require('../controllers/pedidos.controller');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = express();

// obtener pedidos por email

/**
 * @swagger
 *  /pedidos/{email}:
 *      get:
 *          summary: obtener pedidos del usuario ingresando su email
 *          tags: [pedidos]
 *          responses:
 *              200:
 *                  description: pedidos obtenidos correctamente
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/pedido'
 *              401:
 *                  description: email no registrado.
 *          parameters: [
 *           {
 *              name: email,
 *              in: path,
 *              description: email del usuario que desea ver sus pedidos,
 *              required: true,
 *              schema: {
 *                  type: array,
 *                  items: {
 *                      type: string
 *                  }
 *              }
 *           },
 *          ]
 */

router.get('/:email', order.obtenerPedidos);

// agregar pedidos.

/**
 * @swagger
 *  /pedidos:
 *      post:
 *          summary: agregar un pedido al sistema
 *          tags: [pedidos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/pedido'
 *          responses:
 *              200:
 *                  description: pedido realizado con exito
 *              401:
 *                  description: no se pudo realizar el pedido intentalo nuevamente
 *
 */
router.post('/', order.agregarPedido);

// obtener todos los pedidos: solo admins

/**
 * @swagger
 *  /pedidos:
 *      get:
 *          summary: obtener todos los pedidos del sistema; solo admins
 *          tags: [pedidos]
 *          responses:
 *              200:
 *                  description: pedidos obtenidos satisfactoriamente.
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/pedido'
 *              401:
 *                  description: usuario no autorizado para obtener los pedidos; no es admin
 *
 */
router.get('/', isAdmin, order.obtenerPedidosUsuario);

// actualizar estado de pedido
/**
 * @swagger
 *  /pedidos/{idPedido}:
 *      put:
 *          summary: cambiar el estado del pedido al que corresponda el id ingresado
 *          tags: [pedidos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/actEstado'
 *          responses:
 *              200:
 *                  description: estado cambiado exitosamente.
 *              401:
 *                  description: usuario no autorizado para cambiar el estado del pedido
 *          parameters: [
 *           {
 *              name: idPedido,
 *              in: path,
 *              description: identificador del pedido al cual se va a actualizar el estado,
 *              required: true,
 *              schema: {
 *                  type: array,
 *                  items: {
 *                      type: string,
 *                  }
 *              }
 *           }
 *          ]
 */
router.put('/:idPedido', isAdmin, order.actualizarPedido);

/**
 * @swagger
 *  /pedidos/{idPedido}:
 *      delete:
 *          summary: elimina la orden correspondiente al id ingresado
 *          tags: [pedidos]
 *          responses:
 *              200:
 *                  description: orden eliminada correctamente
 *              401:
 *                  description: usuario no autorizado para eliminar una orden
 *          parameters: [
 *           {
 *              name: idPedido,
 *              in: path,
 *              description: id con el que está registrado en el sistema el pedido a eliminar,
 *              required: true,
 *              schema: {
 *                  type: string,
 *              }
 *           },
 *          ]
 */
router.delete('/:idPedido', isAdmin, order.eliminarPedido);

/**
 * @swagger
 * tags:
 *  name: pedidos
 *  description: apartado de pedidos de los usarios.
 *
 * components:
 *  schemas:
 *      pedido:
 *          type: object
 *          reqired:
 *              -productos
 *              -direccion
 *              -email
 *              -medioPago
 *              -estado
 *          properties:
 *              productos:
 *                  type: object
 *                  items:
 *                      nombreProducto:
 *                          type: string
 *                          description: nombre del producto a pedir
 *                      cantidad:
 *                          type: number
 *                          description: cantidad del producto a pedir.
 *                  description: lista de productos y cantidad a pedir.
 *              direccion:
 *                  type: string
 *                  description: lugar al cual se llevaran los productos
 *              email:
 *                  type: string
 *                  description: correo con el cual se registro el usuario en el sistema
 *              medioPago:
 *                  type: string
 *                  description: forma en la que se pagará el pedido
 *          example:
 *              productos: [
 *                  {
 *                      nombreProducto: coca cola,
 *                      cantidad: 2
 *                  },
 *                  {
 *                      nombreProducto: salchipapa doble,
 *                      cantidad: 2
 *                  },
 *              ]
 *              direccion: los rosales cr11
 *              email: emailusuario2@gmail.com
 *              medioPago: efectivo
 *      actEstado:
 *          type: object
 *          required:
 *              -estado
 *          properties:
 *              estado:
 *                  type: string
 *                  description: estado al cual se quiere actualizar el producto
 *          example:
 *              estado: confirmado
 */
module.exports = router;
