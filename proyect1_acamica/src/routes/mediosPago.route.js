const express = require('express');

const payments = require('../controllers/mediosPago.controller');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = express();

// obtener medios de pago
/**
 * @swagger
 *  /mediospago:
 *      get:
 *          summary: devuelve todos los medios de pago registrados
 *          tags: [mediospago]
 *          responses:
 *              200:
 *                  description: medios de pago obtenidos con exito
 *                  content:
 *                      application/json:
 *                          squema:
 *                              $ref: '#components/schemas/mediopago'
 *              401:
 *                  description: usuario no es administrador
 */
router.get('/', payments.obtenerMediosPago);

// agregar medios de pago
/**
 * @swagger
 *  /mediospago:
 *      post:
 *          summary: agrega un nuevo medio de pago, solo admins
 *          tags: [mediospago]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/mediopago'
 *          responses:
 *              200:
 *                  description: medio de pago agregado correctamente
 *              401:
 *                  description: usuario no autorizado para agregar medios de pago
 */
router.post('/', isAdmin, payments.agregarMedioPago);

// actualizar medios de pago
/**
 * @swagger
 *  /mediospago/{idPedido}:
 *      put:
 *          summary: actualizar nombre y descripcion de un medio de pago
 *          tags: [mediospago]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/mediopago'
 *          responses:
 *              200:
 *                  description: medio de pago actualizado correctamente
 *              401:
 *                  description: usuario no autorizado para actualizar un medio de pago
 *          parameters: [
 *           {
 *              name: idPedido,
 *              in: path,
 *              description: id con el que está registrado el pedido a actalizar en el sistema,
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
router.put('/:idMedioPago', isAdmin, payments.actualizarMedioPago);

// eliminar medios de pago
/**
 * @swagger
 *  /mediospago/{idMedioPago}:
 *      delete:
 *          summary: elimina el medio de pago correspondiente al id ingresado por el admin
 *          tags: [mediospago]
 *          responses:
 *              200:
 *                  description: medio de pago eliminado exitosamente
 *              401:
 *                  description: usuario no autorizado para eliminar medios de pago
 *          parameters: [
 *           {
 *              name: idMedioPago,
 *              in: path,
 *              description: id con el que está registrado el medio de pago en el sistema,
 *              required: true,
 *              schema: {
 *                  type: array,
 *                  items: {
 *                      type: string,
 *                  }
 *              }
 *              }
 *          ]
 */
router.delete('/:idMedioPago', isAdmin, payments.eliminarMedioPago);

/**
 * @swagger
 * tags:
 *  name: mediospago
 *  description: apartado para los administradores manejar medios de pago
 *
 * components:
 *      schemas:
 *          mediopago:
 *              type: object
 *              required:
 *                  -nombreMedioPago
 *                  -descripcion
 *              properties:
 *                  nombreMedioPago:
 *                      type: string
 *                      description: nombre asignado al medio de pago
 *                  descripcion:
 *                      type: string
 *                      description: breve resumen descriptivo del medio de pago
 *              example:
 *                  nombreMedioPago: Paypal
 *                  descripcion: pago mediante la plataforma paypal.
 */

module.exports = router;
