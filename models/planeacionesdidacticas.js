
module.exports = (sequelize, DataTypes) => {
  const PlaneacionesDidacticas = sequelize.define('PlaneacionesDidacticas', {
    sesion: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    experiencias: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    tecnica: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ambiente: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    modalidad: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    txtModalidad: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    recurso: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    txtRecurso: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    producto: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    txtProducto: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'planeacionesdidacticas',
    timestamps: false,
  });

  return PlaneacionesDidacticas;
};
