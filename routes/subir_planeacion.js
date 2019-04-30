const multer = require('multer');
const router = require('express').Router();
const estrategiasTecnicasCtrl = require('../controllers/subir_planeacion');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, './csvfiles/');
  },
  filename(_req, file, cb) {
    cb(null, new Date().toLocaleDateString() + file.originalname);
  },
});

const upload = multer({ storage });

router.route('/')
  .post(upload.single('planeacioncsv'), estrategiasTecnicasCtrl.post);

module.exports = router;
