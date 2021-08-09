const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const db = {};

let dbStorage;

if (process.env.ENV === 'Test') {
  dbStorage = 'Test_db.sqlite';
  console.log('This is a test');
} else {
  dbStorage = 'db.sqlite';
  console.log('This is a Dev');
}

const sequelize = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: dbStorage,
  operatorsAliases: 0,
  define: {
    freezeTableName: true,
  }
});

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
