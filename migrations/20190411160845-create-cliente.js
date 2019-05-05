
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('clientes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nombre: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fecha_creacion: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    fecha_modificacion: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('clientes'),
};
