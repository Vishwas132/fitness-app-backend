module.exports = (sequelize, DataTypes) => {
  const Exercises = sequelize.define(
    "Exercises",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at"
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at"
      }
    },
    {
      schema: "fitness_app",
      tableName: "exercises",
      timestamps: false
    }
  );

  Exercises.associate = function({Users}) {
    Exercises.belongsTo(Users, {
      as: "UserExercises",
      foreignKey: "userId",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });
  };
  return Exercises;
};
