
module.exports = (sequelize, DataTypes) => {
  const Ambientes = sequelize.define('Ambientes', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Tecnica: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Ambiente: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'ambientes',
  });

  return Ambientes;
};
