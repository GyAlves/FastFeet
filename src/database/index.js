import Sequelize from 'sequelize';
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Deliveries from '../app/models/Deliveries';
import Problems from '../app/models/Problems';

import databaseConfig from '../config/database';

const models = [User, Recipients, Deliveryman, File, Deliveries, Problems];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
