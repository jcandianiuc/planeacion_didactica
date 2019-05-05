/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const TecnicasProductos = sequelize.define('TecnicasProductos', {
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
    Producto: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Ingles: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  }, {
    tableName: 'tecnicasproductos',
  });
  return TecnicasProductos;
};
