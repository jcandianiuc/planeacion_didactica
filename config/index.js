const fs = require('fs');
const logger = require('../utils/logger');

let environment = process.env.ENVIRONMENT || 'development';
if (!fs.existsSync(`./config/${environment}.json`)) {
  fs.copyFileSync(
    './config/env.example',
    `./config/${environment}.json`,
  );
}

try {
  environment = fs
    .readFileSync(`./config/${environment}.json`)
    .toString();
  environment = JSON.parse(environment);
} catch (e) {
  logger.error('La configuración del servidor no pudo ser cargada.');
  process.exit();
}

module.exports = environment;
