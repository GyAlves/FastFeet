import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
<<<<<<< HEAD
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
=======
>>>>>>> 4f6769d9a545bd349792cc6f50ec7a3fa4764555
  }
}
export default Deliveryman;
