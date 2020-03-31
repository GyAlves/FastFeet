module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveryProblems', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      delivery_id: {
        type: Sequelize.INTEGER,
        references: { model: 'deliveries', key: 'id' },
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliveryProblems');
  },
};
