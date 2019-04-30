/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const TextoRecursos = sequelize.define('TextoRecursos', {
    Recurso: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Texto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'textorecursos',
  });

  return TextoRecursos;
};
