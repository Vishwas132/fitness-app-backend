const {Umzug, SequelizeStorage} = require("umzug");
const {sequelize} = require("./models");

const umzug = new Umzug({
  storage: new SequelizeStorage({sequelize}),
  context: sequelize.getQueryInterface(),
  storageOptions: {
    sequelize: sequelize,
    modelName: "SequelizeMeta",
    columnName: "name"
  },
  migrations: {
    glob: ["migrations/*.js", {cwd: process.cwd()}]
  },
  logging: console.log
});


if (require.main === module) {
  umzug.runAsCLI();
}

exports.umzug = umzug;