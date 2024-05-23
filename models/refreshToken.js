const { on } = require("nodemailer/lib/xoauth2");

module.exports = (sequelize, DataTypes) => {
  const RefreshTokens = sequelize.define(
    "RefreshTokens",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      isRevoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW()
      }
    },
    {
      schema: "fitness_app",
      tableName: "refresh_tokens",
      timestamps: false
    }
  );

  RefreshTokens.associate = function({Users}) {
    RefreshTokens.belongsTo(Users, {
      as: "Users",
      foreignKey: "userId",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });
  };
  return RefreshTokens;
};

