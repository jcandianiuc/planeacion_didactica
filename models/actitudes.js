
module.exports = (sequelize, DataTypes) => {
  const Actitudes = sequelize.define('actitudes', {
    Actitud: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'actitudes',
  });

  return Actitudes;
};
