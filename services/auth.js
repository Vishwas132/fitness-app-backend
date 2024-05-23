const {Users, RefreshTokens} = require("../models");
const utils = require("../utils/utils");

const refreshTokens = async ({oldRefreshToken, userId}) => {
  try {
    const user = await RefreshTokens.findOne({
      where: {
        token: oldRefreshToken,
        userId
      },
      include: {
        model: Users,
        as: "Users"
      }
    });
    if (!user || user.isRevoked) {
      return null;
    }
    const newAccessToken = utils.generateAccessToken({
      userId: user.Users.id,
      role: user.Users.role
    });
    const newRefreshToken = utils.generateRefreshToken({
      userId: user.Users.id,
      role: user.Users.role
    });
    const updatedToken = await RefreshTokens.update(
      {
        isRevoked: true
      },
      {
        where: {
          userId,
          token: oldRefreshToken
        }
      }
    );
    if (!updatedToken[0]) {
      return null;
    }

    await RefreshTokens.create({
      token: newRefreshToken,
      userId
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async ({email}) => {
  try {
    const user = await Users.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return null;
    }
    const token = utils.generateForgotPasswordToken(user);
    await utils.sendEmail({
      to: email,
      subject: "Reset Password",
      html: `<p>Please click on the following link to reset your password:</p>
      <p><a href="${
        process.env.FRONTEND_URL
      }/reset-password?token=${token}">Reset Password</a></p>`
    });
    await Users.update(
      {
        resetPasswordToken: token,

      },
      {
        where: {
          email
        }
      }
    );
    return {
      message: "Password reset link sent successfully"
    };
  } catch (error) {
    throw error;
  }
};

const resetPassword = async ({token, password}) => {
  try {
    const user = await Users.findOne({
      where: {
        resetPasswordToken: token
      },
      attributes: ["id", "email", "role"]
    });
    if (!user) {
      return null;
    }

    const hashedPassword = await utils.hashPassword(password);
    await Users.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        isEmailVerified: true
      },
      {
        where: {
          resetPasswordToken: token
        }
      }
    );
    return {
      message: "Password updated successfully"
    };
  } catch (error) {
    throw error;
  }
};

const sendVerificationEmail = async ({email}) => {
  try {
    const user = await Users.findOne({
      where: {
        email
      },
      attributes: ["id", "email", "role"]
    });
    if (!user) {
      return null;
    }
    const token = utils.generateVerificationToken(user);
    await utils.sendEmail({
      to: email,
      subject: "Verify Email",
      html: `<p>Please click on the following link to verify your email:</p>
      <p><a href="${
        process.env.FRONTEND_URL
      }/verify-email?token=${token}">Verify Email</a></p>`
    });
    await Users.update(
      {
        verificationToken: token,
      },
      {
        where: {
          email
        }
      }
    );
    return {
      message: "Verification email sent successfully"
    };
  } catch (error) {
    throw error;
  }
};

const verifyEmail = async ({token}) => {
  try {
    const user = await Users.findOne({
      where: {
        verificationToken: token
      }
    });
    if (!user) {
      return null;
    }
    await Users.update(
      {
        verificationToken: null,
        isEmailVerified: true
      },
      {
        where: {
          verificationToken: token
        }
      }
    );
    return {
      message: "Email verified successfully"
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
