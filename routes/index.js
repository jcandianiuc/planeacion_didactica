const router = require('express').Router();
const clientesRoutes = require('./clientes');
const subirPlaneacionRoutes = require('./subir_planeacion');
const obtenerPlaneacionRoutes = require('./obtener_planeacion');

router.route('/')
  .get((req, res) => res.send({ msg: 'Project management API' }));


router.use('/clientes', clientesRoutes);
router.use('/subir_planeacion', subirPlaneacionRoutes);
router.use('/obtener_planeacion', obtenerPlaneacionRoutes);

module.exports = router;
