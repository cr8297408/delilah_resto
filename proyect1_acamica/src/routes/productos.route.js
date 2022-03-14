const express = require('express');

const router = express();

const product = require('../controllers/productos.controller');
const isAdmin = require('../middlewares/isAdmin.middleware');

/**
 * @swagger
 *  /productos:
 *      get:
 *          summary: devuelve un json con todos los productos;
 *          tags: [productos]
 *          responses:
 *              200:
 *                  description: productos obtenidos
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/producto'
 *              401:
 *                  description: usuario no validado
 */
router.get('/', product.obtenerProductos);

/**
 * @swagger
 *  /productos:
 *      post:
 *          summary: agrega un nuevo producto al sistema
 *          tags: [productos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/producto'
 *          responses:
 *              200:
 *                  description: producto agregado exitosamente
 *              401:
 *                  descripion: usuario no auorizado para agregar productos
 */
router.post('/', isAdmin, product.agregarProducto);

// actualizar un producto
/**
 * @swagger
 *  /productos/{idProducto}:
 *      put:
 *          summary: actualizar nombre y precio de un producto
 *          tags: [productos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/actProducto'
 *          responses:
 *              200:
 *                  description: producto actualizado correctamente
 *              401:
 *                  description: usuario no autorizado para actualizar un producto
 *          parameters: [
 *           {
 *              name: idProducto,
 *              in: path,
 *              description: id con el que está registrado el producto a actalizar en el sistema,
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
router.put('/:id', isAdmin, product.actualizarProducto);

// eliminar un producto por id:
/**
 * @swagger
 *  /productos/{idProducto}:
 *      delete:
 *          summary: elimina el producto correspondiente al id ingresado
 *          tags: [productos]
 *          responses:
 *              200:
 *                  description: producto eliminado correctamente
 *              401:
 *                  description: usuario no autorizado para eliminar un producto
 *          parameters: [
 *           {
 *              name: idProducto,
 *              in: path,
 *              description: id con el que está registrado en el sistema el producto a eliminar,
 *              required: true,
 *              schema: {
 *                  type: array,
 *                  items: {
 *                      type: string,
 *                  }
 *              }
 *           },
 *          ]
 */
router.delete('/:idProducto', isAdmin, product.eliminarProducto);

/**
 * @swagger
 * tags:
 *  name: productos
 *  description: sección de productos
 *
 * components:
 *  schemas:
 *      producto:
 *          type: object
 *          required:
 *              -nombre
 *              -precio
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: nombre del producto
 *              precio:
 *                  type: number
 *                  description: precio del producto
 *              idProducto:
 *                  type: string
 *                  description: identificador del producto en el sistema
 *              descripcion:
 *                  type: string
 *                  descripcion: informacion del producto
 *          example:
 *              nombreProducto: arroz chino
 *              precio: 350
 *              descripcion: arroz chino porcion personal
 *      actProducto:
 *          type: object
 *          required:
 *              -nombre
 *              -precio
 *          properties:
 *              nombreProducto:
 *                  type: string
 *                  description: nombre del producto
 *              precio:
 *                  type: number
 *                  description: precio del producto
 *              descripcion:
 *                  type: string
 *                  descripcion: informacion del producto
 *          example:
 *              nombreProducto: hamburguesa clasica nueva
 *              precio: 360
 *              descripcion: hamburguesa clasica con nueva receta
 */
module.exports = router;
