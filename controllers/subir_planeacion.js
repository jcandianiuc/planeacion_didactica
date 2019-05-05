/* eslint-disable no-undef */
/* eslint-disable consistent-return */
const CSVtoJSON = require('csvtojson');
const sequelize = require('sequelize');
const db = require('../models');
const hashids = require('../utils/hashids');


const get = async (req, res, next) => {
  try {
    let clientes;

    if (req.params.id) {
      clientes = await db.EstrategiasTecnicas.findOne({
        where: {
          id: hashids.decode(req.params.id),
        },
      });

      if (!clientes) {
        return res.status(404).send({ msg: 'Recurso no encontrado.' });
      }
    } else {
      clientes = await db.EstrategiasTecnicas.findAll();
    }
    return res.status(200).send(clientes);
  } catch (e) {
    return next(e);
  }
};


const post = async (req, res, next) => {
  try {
    const tabla = await CSVtoJSON().fromFile(`${req.file.destination}${req.file.filename}`);
    let verbo;
    let tecnica;
    let ambiente;
    let modalidad;
    let txtModalidad;
    let recursos;
    let txtRecursos;
    const planeacion = [];
    let filaPlaneacion = {};
    // eslint-disable-next-line no-restricted-syntax
    for (fila of tabla) {
      console.log();
      // eslint-disable-next-line no-await-in-loop
      verbo = await db.Verbos.findOne({
        attributes: ['Estrategia', 'Verbo'],
        where: {
          Estrategia: fila.Estrategia,
        },
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      tecnica = await db.EstrategiasTecnicas.findOne({
        attributes: ['Estrategia', 'Tecnica'],
        where: {
          Estrategia: fila.Estrategia,
        },
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      ambiente = await db.Ambientes.findOne({
        attributes: ['Ambiente', 'Tecnica'],
        where: {
          Tecnica: tecnica.dataValues.Tecnica,
        },
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      modalidad = await db.Modalidades.findOne({
        attributes: ['Modalidad'],
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      txtModalidad = await db.TextoModalidades.findOne({
        attributes: ['Texto'],
        where: {
          Modalidad: modalidad.dataValues.Modalidad,
        },
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      recursos = await db.Recursos.findOne({
        attributes: ['Recurso'],
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      txtRecursos = await db.TextoRecursos.findOne({
        attributes: ['Texto'],
        where: {
          Recurso: recursos.dataValues.Recurso,
        },
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      producto = await db.TecnicasProductos.findOne({
        attributes: ['Producto'],
        where: {
          Estrategia: fila.Estrategia,
        },
        order: sequelize.fn('RAND'),
      });

      // eslint-disable-next-line no-await-in-loop
      txtProducto = await db.TextoProductos.findOne({
        attributes: ['Texto'],
        where: {
          Producto: producto.dataValues.Producto,
        },
        order: sequelize.fn('RAND'),
      });


      filaPlaneacion = {
        sesion: fila.Sesion,
        experiencias: `${verbo.dataValues.Verbo} ${fila.Tema} mediante una tecnica de ${tecnica.dataValues.Tecnica}`,
        tecnica: tecnica.dataValues.Tecnica,
        ambiente: ambiente.dataValues.Ambiente,
        modalidad: modalidad.dataValues.Modalidad,
        txtModalidad: txtModalidad.dataValues.Texto,
        recurso: recursos.dataValues.Recurso,
        txtRecurso: txtRecursos.dataValues.Texto,
        producto: producto.dataValues.Producto,
        txtProducto: txtProducto.dataValues.Texto,
        token: 'tk1',
      };

      // eslint-disable-next-line no-await-in-loop
      await db.PlaneacionesDidacticas.create(filaPlaneacion);

      planeacion.push(Object.assign({}, filaPlaneacion));
    }

    return res.send({ msg: planeacion });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  get,
  post,
};
