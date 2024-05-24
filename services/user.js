const {Users, RefreshTokens} = require("../models");
const utils = require("../utils/utils");

const register = async ({
  email,
  password,
  role = "user",
  firstName,
  lastName
}) => {
  try {
    const user = await Users.findOne({
      where: {
        email
      }
    });
    if (user) {
      return null;
    }

    const hashedPassword = await utils.hashPassword(password);

    const newUser = await Users.create({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const login = async ({email, password}) => {
  try {
    const user = await Users.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isValidPassword = await utils.comparePassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const accessToken = utils.generateAccessToken({userId: user.id, role: user.role});
    const refreshToken = utils.generateRefreshToken({userId: user.id, role: user.role});
    await RefreshTokens.create(
      {
        token: refreshToken,
        userId: user.id
      }
    );
    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    throw error;
  }
};

const logout = async ({refreshToken, userId}) => {
  try {
    const user = await RefreshTokens.update(
      {
        isRevoked: true
      },
      {
        where: {
          token: refreshToken,
          userId
        }
      }
    );
    if (!user[0]) {
      return null;
    }
    return {
      message: "Users logged out successfully"
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
  logout
};
