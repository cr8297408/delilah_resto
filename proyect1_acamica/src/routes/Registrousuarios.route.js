const express = require('express');

const usser = require('../controllers/usuarios.controller');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = express();

/**
 * @swagger
 *  /usuarios/registro:
 *  post:
 *      summary: registra un usuario nuevo en la api.
 *      security: [] # No security
 *      tags: [usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                         $ref: '#/components/schemas/usuario'
 *      responses:
 *          201:
 *              description: usuario creado
 *          401:
 *              description: json requerido
 */

router.post('/registro', usser.agregarUsuario);

/**
 * @swagger
 *  /usuarios/login:
 *  post:
 *      summary: logueo de usuarios.
 *      security: [] # No security
 *      tags: [usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                         $ref: '#/components/schemas/usuarioLogueo'
 *      responses:
 *          201:
 *              description: usuario logueado
 *          401:
 *              description: Unauthorized
 */

router.post('/login', usser.loguearUsuario);

/**
     * @swagger
     *  /usuarios:
     *  get:
     *      summary: devuelve un json con todos los usuarios
     *      tags: [usuarios]
     *      responses:
     *          200:
     *              description: devuelve la lista de usuarios registrados
     *              content:
     *                  application/json:
     *                      squema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/usuario'
     *          401:
     *              description: usuario no autorizado
     */
router.get('/', isAdmin, usser.obtenerUsuarios);

/**
 * @swagger
 *  /usuarios/estadoUsuario/{idUsuario}:
 *   get:
 *        summary: suspende o activa un usuario del sistema
 *        tags: [usuarios]
 *        responses:
 *            200:
 *                description: estado del usuario actualizado correctamente
 *                content:
 *                    application/json:
 *                        squema:
 *                            type: array
 *                            items:
 *                                $ref: '#/components/schemas/usuario'
 *            401:
 *                description: usuario no autorizado para cambiar un estado
 *        parameters: [
 *           {
 *                name: idUsuario,
 *                in: path,
 *                description: id con el que está registrado el usuario a suspender o activar,
 *                required: true,
 *                schema: {
 *                     type: array,
 *                     items: {
 *                          type: string,
 *                     }
 *                }
 *           }         
 *        ]
 */
router.get('/estadoUsuario/:id', isAdmin, usser.suspenderUsuario);

/**
 * @swagger
 *  /usuarios/{idUsuario}:
 *      delete:
 *          summary: elimina el usuario correspondiente al id ingresado
 *          tags: [usuarios]
 *          responses:
 *              200:
 *                  description: usuario eliminado correctamente
 *              401:
 *                  description: usuario no autorizado para eliminar un usuario
 *          parameters: [
 *           {
 *              name: idUsuario,
 *              in: path,
 *              description: id con el que está registrado en el sistema el usuario a eliminar,
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
router.delete('/:id', isAdmin, usser.eliminarUsuario);

/**
 * @swagger
 * tags:
 *  name: usuarios
 *  description: seccion de usuarios
 * components:
 *  schemas:
 *      usuario:
 *          type: object
 *          required:
 *              - usuario
 *              - nombre
 *              - email
 *              - telefono
 *              - dirección
 *              - contrasenia
 *              - isAdmin
 *          properties:
 *              usuario:
 *                  type: string
 *                  description: nombre de usuario del cliente
 *              nombre:
 *                  type: string
 *                  description: nombre y apellido del usuario
 *              email:
 *                  type: string
 *                  description: email del usuario
 *              telefono:
 *                  type: string
 *                  description: numero telefonico del usuario
 *              dirección:
 *                  type: string
 *                  description: direccion predeterminada para el envio de los pedidos
 *              contrasenia:
 *                  type: string
 *                  description: contrasenia proporcionada por el usuario.
 *              idUsuario:
 *                  type: string
 *                  description: identificador del usuario
 *              isAdmin:
 *                  type: boolean
 *                  description: usuario administrador
 *          example:
 *              usuario: ejemploDeusuario
 *              nombre: usuario ramirez
 *              email: example@gmail.com
 *              telefono: "3133334444"
 *              direccion: m13 cs7 barrio ejemplo
 *              contrasenia: contrasenia2ejemplo
 *              repetir_contrasenia: contrasenia2ejemplo
 *      usuarioLogueo:
 *          type: object
 *          required:
 *             -email
 *             -contrasenia
 *          properties:
 *             email:
 *                  type: string
 *                  description: email con el que se registro el usuario
 *             contrasenia:
 *                  type: string
 *                  description: contrasenia del usuario
 *          example:
 *             email: example@gmail.com
 *             contrasenia: contrasenia2ejemplo
 */

module.exports = router;
