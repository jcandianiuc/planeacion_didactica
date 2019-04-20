/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');
const db = require('../models');
const config = require('../config');
const hashids = require('../utils/hashids');
const validator = require('../utils/validator');

const get = async (req, res, next) => {
  try {
    const usuarios = await db.Usuario.findAll();
    return res.status(200).send(usuarios);
  } catch (e) {
    return next(e);
  }
};

const post = (req, res, next) => {
  try {
    const validation = new Validator(req.body, {
      nombre: 'required',
      apellidos: 'required',
      correo_electronico: 'required|email|unique:Usuario,correo_electronico',
      contrasenia: 'required',
    }, validator.messages);

    validation.fails(() => res.status(409).send({
      msg: 'Existen errores de validación.',
      errores: validation.errors.all(),
    }));

    validation.passes(async () => {
      const salt = bcrypt.genSaltSync(10);
      req.body.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);

      const usuario = await db.Usuario.create(req.body);
      return res.status(201).send(usuario);
    });
  } catch (e) {
    return next(e);
  }
};

const put = async (req, res, next) => {
  try {
    const id = hashids.decode(req.params.id);

    const usuario = await db.Usuario.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      return res.status(404).send({ msg: 'Recurso no encontrado.' });
    }

    const validation = new Validator(req.body, {
      correo_electronico: `email|unique:Usuario,correo_electronico,id,${id}`,
    }, validator.messages);

    validation.fails(() => res.status(409).send({
      msg: 'Existen errores de validación',
      errores: validation.errors.all(),
    }));

    validation.passes(async () => {
      if (req.body.contrasenia) {
        const salt = bcrypt.genSaltSync(10);
        req.body.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);
      }

      await usuario.update(req.body);
      return res.status(200).send(usuario);
    });
  } catch (e) {
    return next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const usuario = await db.Usuario.findOne({
      where: {
        id: hashids.decode(req.params.id),
      },
    });

    if (!usuario) {
      return res.status(404).send({ msg: 'Recurso no encontrado.' });
    }

    if (usuario.id === req.sesion.id) {
      return res.status(409).send({ msg: 'No es posible elimiar tu propio usuario. ' });
    }

    await usuario.destroy();
    return res.status(200).send({ msg: 'Recurso eliminado con éxito.' });
  } catch (e) {
    return next(e);
  }
};

const login = (req, res, next) => {
  try {
    const validation = new Validator(req.body, {
      correo_electronico: 'required',
      contrasenia: 'required',
    }, validator.messages);

    validation.fails(() => res.status(409).send({
      msg: 'Existen errores de validación',
      errores: validation.errors.all(),
    }));

    validation.passes(async () => {
      let usuario = await db.Usuario.findOne({
        where: {
          correo_electronico: req.body.correo_electronico,
          activo: true,
        },
      });

      if (!usuario) {
        return res.status(401).send({ msg: 'Datos de acceso incorrectos.' });
      }

      const match = bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia);

      if (!match) {
        return res.status(401).send({ msg: 'Datos de acceso incorrectos.' });
      }

      usuario = usuario.toJSON();
      usuario.token = jwt.sign(usuario, config.secret);

      return res.status(200).send(usuario);
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  get,
  post,
  put,
  destroy,
  login,
};
