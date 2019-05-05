/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const EstrategiasTecnicas = sequelize.define('EstrategiasTecnicas', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Estrategia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Tecnica: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Ingles: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  }, {
    tableName: 'estrategiastecnicas',
    timestamps: false,
  });

  return EstrategiasTecnicas;
};
