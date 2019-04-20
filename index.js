const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();
// eslint-disable-next-line no-unused-expressions
fs.existsSync(path.join(__dirname, 'logs')) || fs.mkdirSync(path.join(__dirname, 'logs'));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send({ msg: 'Recurso no encontrado.' });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const err = {
    route: req.path,
    date: new Date(),
    message: error.message,
    body: req.body,
    headers: req.headers,
    params: req.params,
    query: req.query,
    sesion: req.sesion || {},
    clientIp: req.connection.remoteAddress,
    stack: error.stack,
    sql: error.sql,
  };

  fs.writeFileSync(path.join(__dirname, 'logs', `error-${new Date().toISOString()}.log`), JSON.stringify(err, null, 4));

  return res.status(500).send({ msg: 'Error en el servidor.' });
});

app.listen(config.port, (err) => {
  if (err) {
    return logger.error(err);
  }

  return logger.info(`Servidor iniciado en el puerto ${config.port}`);
});
