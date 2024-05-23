module.exports = (sequelize, DataTypes) => {
  const PasswordResetTokens = sequelize.define(
    "PasswordResetTokens",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "email"
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at"
      }
    },
    {
      schema: "fitness_app",
      tableName: "password_reset_tokens",
      timestamps: false
    }
  );
  
  PasswordResetTokens.associate = function ({Users}) {
    PasswordResetTokens.belongsTo(Users, {
      as: "Users",
      foreignKey: "email",
      targetKey: "email",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });
  };
  return PasswordResetTokens;
};

