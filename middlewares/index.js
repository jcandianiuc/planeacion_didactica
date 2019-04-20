const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token || req.body.token || req.query.token;
    try {
      req.sesion = jwt.verify(token, config.secret);
      return next();
    } catch (err) {
      return res.status(403).send({ msg: 'Token de sesión invalido.' });
    }
  },
};
