/* eslint-disable consistent-return */
const Validator = require('validatorjs');
const db = require('../models');
const hashids = require('../utils/hashids');
const validator = require('../utils/validator');


const get = async (req, res, next) => {
  try {
    let clientes;

    if (req.params.id) {
      clientes = await db.Cliente.findOne({
        where: {
          id: hashids.decode(req.params.id),
        },
      });

      if (!clientes) {
        return res.status(404).send({ msg: 'Recurso no encontrado.' });
      }
    } else {
      clientes = await db.Cliente.findAll();
    }
    return res.status(200).send(clientes);
  } catch (e) {
    return next(e);
  }
};

const post = (req, res, next) => {
  try {
    const validation = new Validator(req.body, {
      nombre: 'required|unique:Cliente,nombre',
    }, validator.messages);

    validation.fails(() => res.status(409).send({
      msg: 'Existen errores de validación.',
      errores: validation.errors.all(),
    }));

    validation.passes(async () => {
      const cliente = await db.Cliente.create(req.body);
      return res.status(201).send(cliente);
    });
  } catch (e) {
    return next(e);
  }
};

const put = async (req, res, next) => {
  try {
    const id = hashids.decode(req.params.id);

    const cliente = await db.Cliente.findOne({
      where: {
        id,
      },
    });

    if (!cliente) {
      return res.status(404).send({ msg: 'Recurso no encontrado.' });
    }
    const validation = new Validator(req.body, {
      nombre: `unique:Cliente,nombre,id,${id}`,
    });

    validation.fails(() => res.status(409).send({
      msg: 'Existen errores en la validación.',
      errores: validation.errors.all(),
    }));

    validation.passes(async () => {
      await cliente.update(req.body);
      return res.status(200).send(cliente);
    });
  } catch (e) {
    return next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const cliente = await db.Cliente.findOne({
      where: {
        id: hashids.decode(req.params.id),
      },
    });

    if (!cliente) {
      return res.status(404).send({ msg: 'Recurso no encontrado.' });
    }

    await cliente.destroy();
    return res.status(200).send({ msg: 'Recurso eliminado con éxito.' });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  get,
  post,
  put,
  destroy,
};
