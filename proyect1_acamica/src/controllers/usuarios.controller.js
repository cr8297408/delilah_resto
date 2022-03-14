const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const usuarioSchema = require('../Schemas/usuarios.Schema');
const loginSchema = require('../Schemas/login.Schema');
const Usuario = require('../models/usuarios.model');

const configs = require('../config');

const agregarUsuario = async (req, res) => {
    try {
        const {
            usuario,
            nombre,
            email,
            telefono,
            direccion,
            contrasenia,
            isAdmin,
        } = await usuarioSchema.validateAsync(req.body);
        const filtroUsuario = await Usuario.findOne({ usuario });
        if (!filtroUsuario) {
            const filtroEmail = await Usuario.findOne({ email });
            if (!filtroEmail) {
                const usuarioNuevo = new Usuario({
                    usuario,
                    nombre,
                    email,
                    telefono,
                    direccion,
                    contrasenia: bcrypt.hashSync(contrasenia, 10),
                    isAdmin,
                });
                const usuarioCreado = await usuarioNuevo.save();
                res.status(201).json(usuarioCreado);
            } else { res.status(400).json('el email ya está en uso'); }
        } else { res.status(400).json('el usuario ya está en uso'); }
        
    } catch (error) {
        res.status(400).json(error.details[0].message);
    }
};

const loguearUsuario = async (req, res) => {
    try {
        const { email, contrasenia } = await loginSchema.validateAsync(req.body);
        const {
            nombre,
            usuario,
            contrasenia: contrasena,
            isAdmin,
        } = await Usuario.findOne({ email });
        const resultado = bcrypt.compareSync(contrasenia, contrasena);
        if (resultado) {
            const token = jsonwebtoken.sign({
                nombre,
                usuario,
                isAdmin,
            }, configs.security.JWT_SECRET);
            res.json({ token });
        } else { res.status(401).json('Unauthorized'); }
    } catch (error) {
        res.json(error);
    }
};

const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const result = await Usuario.findByIdAndDelete({ _id: id });
            res.json(result);
        } else { res.json('no se pudo obtener el id'); }
    } catch (error) {
        res.status(400).json('el usuario no existe');
    }
};

// si el usuario está suspendido, entonces lo activará automaticamente, y visceversa
const suspenderUsuario = async (req, res) => {
    const id = req.params.id;
    const usuario = await Usuario.findById(id);
    if (usuario) {
            const estado = usuario.activo
            if (estado) {
                usuario.activo = false;
                await usuario.save();
                res.status(200).json('el usuario se suspendió correctamente');
            } else {
                usuario.activo = true;
                await usuario.save()
                res.status(200).json('el usuario se activó correctamente');
            }
    } else {
        res.status(400).json('el usuario no existe');
    }
}

const usser = {};

usser.agregarUsuario = agregarUsuario;
usser.obtenerUsuarios = obtenerUsuarios;
usser.eliminarUsuario = eliminarUsuario;
usser.loguearUsuario = loguearUsuario;
usser.suspenderUsuario = suspenderUsuario;

module.exports = usser;
