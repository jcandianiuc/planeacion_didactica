
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('planeacionesDidacticas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    sesion: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    experiencias: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    tecnica: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    ambiente: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    modalidad: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    txtModalidad: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    recurso: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    txtRecurso: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    producto: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    txtProducto: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    token: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }),
  down: queryInterface => queryInterface.dropTable('planeacionesDidacticas'),
};
