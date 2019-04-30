/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Verbos = sequelize.define('Verbos', {
    Estrategia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Subestrategia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Verbo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'verbos',
    timestamps: false,
  });

  return Verbos;
};
