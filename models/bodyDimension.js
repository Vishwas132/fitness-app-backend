module.exports = (sequelize, DataTypes) => {
  const BodyDimensions = sequelize.define(
    "BodyDimensions",
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
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      bicepSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "bicep_size"
      },
      thighSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "thigh_size"
      },
      bellySize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "belly_size"
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
      tableName: "body_dimensions",
      timestamps: false
    }
  );

  BodyDimensions.associate = function({Users}) {
    BodyDimensions.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });
  };
  return BodyDimensions;
};
