import Sequelize from 'sequelize';
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
<<<<<<< HEAD
import Deliveries from '../app/models/Deliveries';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Recipients, Deliveryman, Deliveries, File];
=======
import Delivery from '../app/models/Delivery';

import databaseConfig from '../config/database';

const models = [User, Recipients, Deliveryman, Delivery];
>>>>>>> 4f6769d9a545bd349792cc6f50ec7a3fa4764555

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
