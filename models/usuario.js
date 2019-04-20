
const hashids = require('../utils/hashids');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
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
    apellidos: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    correo_electronico: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    contrasenia: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    underscored: true,
    tableName: 'usuarios',
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  });

  Usuario.associate = () => {
    // associations can be defined here
  };

  // eslint-disable-next-line func-names
  Usuario.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.contrasenia;
    return values;
  };

  return Usuario;
};
