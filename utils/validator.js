const Validator = require('validatorjs');
const db = require('../models');

const { Op } = db.Sequelize;

Validator.registerAsync('unique', async (value, attributes, req, passes) => {
  const [model, field, exceptionField, exceptionValue] = attributes.split(',');

  const exception = {};

  if (exceptionField && exceptionValue) {
    exception[exceptionField] = {
      [Op.not]: exceptionValue,
    };
  }

  const count = await db[model].count({
    attributes: [field],
    where: {
      [field]: value,
      ...exception,
    },
  });

  if (count === 0) {
    passes();
  } else {
    passes(false, `El atributo ${field} debé ser unico.`);
  }
});

module.exports = {
  messages: {
    required: 'El atributo :attribute es obligatorio.',
    email: 'El atributo :attribute debé ser un email valido.',
  },
};
