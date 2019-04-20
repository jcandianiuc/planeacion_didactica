const router = require('express').Router();
const usuariosCtrl = require('../controllers/usuarios');

router.route('/')
  .get(usuariosCtrl.get)
  .post(usuariosCtrl.post);

router.route('/:id')
  .put(usuariosCtrl.put)
  .delete(usuariosCtrl.destroy);

module.exports = router;
