import { Sequelize } from 'sequelize';
import Enrollment from '../app/models/Enrollment';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import databaseConfig from '../config/database';

const models = [User, Enrollment, Student, Plan];

class DataBase {
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

export default new DataBase();
