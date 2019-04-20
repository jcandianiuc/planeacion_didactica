const router = require('express').Router();
const usuariosRoutes = require('./usuarios');
const middlewares = require('../middlewares');
const usuariosCtrl = require('../controllers/usuarios');

router.route('/')
  .get((req, res) => res.send({ msg: 'sistema planeacion API' }));

router.route('/login')
  .post(usuariosCtrl.login);

router.use('/usuarios', middlewares.verifyToken, usuariosRoutes);



module.exports = router;
