const {readdirSync} = require("fs");
const {Sequelize, DataTypes} = require("sequelize");
const dbConfig = require("../config").db;
const path = require("path");

const {createNamespace} = require("cls-hooked");
const cls = createNamespace("ns_career_counsel");
Sequelize.useCLS(cls);

const sequelize = new Sequelize({
  ...dbConfig,
  logging: dbConfig.logging ? console.log : false,
});

const db = {};
readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
