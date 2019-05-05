/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const TextoProductos = sequelize.define('TextoProductos', {
    Producto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Texto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'textoproductos',
  });

  return TextoProductos;
};
