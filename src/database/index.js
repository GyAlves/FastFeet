import Sequelize from 'sequelize';
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import Deliveries from '../app/models/Deliveries';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Recipients, Deliveryman, Deliveries, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(
        model => models.associate && model.associate(this.connection.models)
      );
  }
}
export default new Database();
