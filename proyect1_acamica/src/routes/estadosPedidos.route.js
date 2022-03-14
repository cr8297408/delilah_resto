const EstadoPedido = require('../models/estadosPedidos.model');
const estado = require('../controllers/estadosPedidos.controller');

const express = require('express');
const router = express();

const isAdmin = require('../middlewares/isAdmin.middleware');

/**
 * @swagger
 *  /estadosPedidos:
 *      get:
 *          summary: devuelve todos los estados disponibles para usar en pedidos
 *          tags: [estadospedidos]
 *          responses:
 *              200:
 *                  description: estados obtenidos correctamente
 *              401:
 *                  description: usuario no es administrador
 */
// ver los estados disponibles para los pedidos
router.get('/', isAdmin, estado.obtenerEstados);

/**
 * @swagger
 *  /estadosPedidos:
 *      post:
 *          summary: agrega un nuevo estado, solo admins
 *          tags: [estadospedidos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/estadopedido'
 *          responses:
 *              201:
 *                  description: estado agregado correctamente
 *              401:
 *                  description: usuario no autorizado para agregar estados
 */

router.post('/', isAdmin, estado.agregarEstado);

/**
 * @swagger
 *  /estadosPedidos/{idEstado}:
 *      put:
 *          summary: actualizar nombre y descripcion de un estado
 *          tags: [estadospedidos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/estadopedido'
 *          responses:
 *              200:
 *                  description: estado actualizado correctamente
 *              401:
 *                  description: usuario no autorizado para actualizar un estado
 *          parameters: [
 *           {
 *              name: idEstado,
 *              in: path,
 *              description: id con el que está registrado el estado a actalizar en el sistema,
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

router.put('/:id', isAdmin, estado.actualizarEstado);

/**
 * @swagger
 *  /estadosPedidos/{idEstado}:
 *      delete:
 *          summary: elimina el estado correspondiente al id ingresado por el admin
 *          tags: [estadospedidos]
 *          responses:
 *              200:
 *                  description: estado eliminado exitosamente
 *              401:
 *                  description: usuario no autorizado para eliminar estados
 *          parameters: [
 *            {
 *               name: idEstado,
 *               in: path,
 *               description: id con el que está registrado el estado en el sistema,
 *               required: true,
 *               schema: {
 *                   type: array,
 *                   items: {
 *                       type: string,
 *                   }
 *               }
 *            }
 *          ]
 */
router.delete('/:idEstado', isAdmin, estado.eliminarEstado);

/**
 * @swagger
 * tags:
 *  name: estadospedidos
 *  description: apartado para los administradores manejar los estados de los pedidos
 * components:
 *      schemas:
 *          estadopedido:
 *              type: object
 *              required:
 *                  -estado
 *              properties:
 *                  estado:
 *                      type: string
 *                      description: nombre asignado al estado
 *                  descripcion:
 *                      type: string
 *                      description: breve resumen descriptivo del estado
 *              example:
 *                  estado: entregado
 *                  descripcion: el pedido se entregó satisfactoriamente
 */

module.exports = router;
