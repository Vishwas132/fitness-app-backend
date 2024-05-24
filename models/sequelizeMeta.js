module.exports = (sequelize, DataTypes) => {
  const SequelizeMeta = sequelize.define(
    "SequelizeMeta",
    {
      name: {
        type: DataTypes.STRING(512),
        field: "name",
        primaryKey: true
      }
    },
    {
      schema: "fitness_app",
      tableName: "SequelizeMeta",
      timestamps: false
    }
  );
  return SequelizeMeta;
};
