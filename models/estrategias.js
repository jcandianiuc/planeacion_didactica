/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Estrategias = sequelize.define('estrategias', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Estrategia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'estrategias',
  });

  return Estrategias;
};
