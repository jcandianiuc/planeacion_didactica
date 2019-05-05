/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Modalidades = sequelize.define('Modalidades', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Modalidad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'modalidades',
    timestamps: false,
  });

  return Modalidades;
};
