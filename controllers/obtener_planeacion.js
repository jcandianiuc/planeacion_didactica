/* eslint-disable consistent-return */
const db = require('../models');


const get = async (req, res, next) => {
  try {
    let planeacion;

    if (req.params.token) {
      planeacion = await db.PlaneacionesDidacticas.findAll({
        where: {
          token: req.params.token,
        },
      });
    }

    return res.status(200).send(planeacion);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  get,
};
