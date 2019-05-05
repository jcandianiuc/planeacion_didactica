/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Recursos = sequelize.define('Recursos', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Recurso: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'recursos',
  });

  return Recursos;
};
