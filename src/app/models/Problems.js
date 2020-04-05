import Sequelize, { Model } from 'sequelize';

class Problems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        delivery_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliveries, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }
}
export default Problems;
