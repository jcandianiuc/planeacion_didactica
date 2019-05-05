const hashids = require('../utils/hashids');

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      get() {
        return hashids.encode(this.getDataValue('id'));
      },
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    tableName: 'clientes',
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  });

  Cliente.associate = () => {
    // associations can be defined here
  };

  return Cliente;
};
