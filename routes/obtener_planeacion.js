const router = require('express').Router();
const obtenerPlaneacionCtrl = require('../controllers/obtener_planeacion');


router.route('/:token')
  .get(obtenerPlaneacionCtrl.get);

module.exports = router;
