/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const TextoModalidades = sequelize.define('TextoModalidades', {
    Modalidad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Texto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'textomodalidades',
  });

  return TextoModalidades;
};
