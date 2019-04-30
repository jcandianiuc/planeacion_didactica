const router = require('express').Router();
const clientesRoutes = require('./clientes');
const subirPlaneacionRoutes = require('./subir_planeacion');

router.route('/')
  .get((req, res) => res.send({ msg: 'Project management API' }));


router.use('/clientes', clientesRoutes);
router.use('/subir_planeacion', subirPlaneacionRoutes);

module.exports = router;
