import Sequelize, { Model } from 'sequelize';

class Deliveries extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        recipient_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(model) {
    this.belongsTo(model.Recipients, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(model.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(model.File, { foreignKey: 'signature_id', as: 'signature' });
  }
}
export default Deliveries;
