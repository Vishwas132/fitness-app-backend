module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING(100),
        field: "first_name"
      },
      lastName: {
        type: DataTypes.STRING(100),
        field: "last_name"
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "user"
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_email_verified"
      },
      resetPasswordToken: {
        type: DataTypes.TEXT,
        field: "reset_password_token"
      },
      verificationToken: {
        type: DataTypes.TEXT,
        field: "verification_token"
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
      tableName: "users",
      timestamps: false
    }
  );

  Users.associate = function({
    Exercises,
    BodyDimensions,
    RefreshTokens,
    PasswordResetTokens
  }) {
    Users.hasMany(Exercises, {
      as: "Exercises",
      foreignKey: "userId",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });

    Users.hasMany(BodyDimensions, {
      as: "BodyDimensions",
      foreignKey: "userId",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });

    Users.hasMany(RefreshTokens, {
      as: "RefreshTokens",
      foreignKey: "userId",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });

    Users.hasMany(PasswordResetTokens, {
      as: "PasswordResetTokens",
      foreignKey: "email",
      sourceKey: "email",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION"
    });
  };

  return Users;
};
