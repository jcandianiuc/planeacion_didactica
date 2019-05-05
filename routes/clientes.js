const router = require('express').Router();
const clientesCtrl = require('../controllers/clientes');

router.route('/')
  .get(clientesCtrl.get)
  .post(clientesCtrl.post);

router.route('/:id')
  .get(clientesCtrl.get)
  .put(clientesCtrl.put)
  .delete(clientesCtrl.destroy);

module.exports = router;
