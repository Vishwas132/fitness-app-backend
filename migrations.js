const models = require("./models");
var {Umzug, SequelizeStorage} = require("umzug");

const checkSequelizeMeta = async () => {
  try {
    await models.SequelizeMeta.findAll();
  } catch (error) {
    console.log("checkSequelizeMeta - ", error);
    const {original} = error;
    if (original && original.code === "42P01") {
      await initialMigrations();
    }
  }
};

const createUmzugInstance = async sequelize => {
  return new Umzug({
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
};

const initialMigrations = async () => {
  try {
    await models.sequelize.sync({alter: true});
  } catch (error) {
    console.log("Error during initial migrations:", error);
  }
};

const upMigrate = async () => {
  try {
    const sequelize = models.sequelize;
    const umzug = await createUmzugInstance(sequelize);
    const migrations = await umzug.pending();
    const pendingMigrations = migrations.map(migration => migration.name);
    console.log("Pending >>> ", pendingMigrations);
    await umzug.up({migrations: pendingMigrations});
    console.log("All migrations completed.");
  } catch (error) {
    console.log("Error during migrations:", error);
    throw error;
  }
};

// The main migrations function that orchestrates the migration process
const migrations = async () => {
  try {
    await checkSequelizeMeta();
    await upMigrate();
  } catch (error) {
    console.log("Error during the migration process:", error);
    throw error;
  }
};

module.exports = migrations;

