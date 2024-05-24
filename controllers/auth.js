const userService = require("../services/auth");
const {logger} = require("../logger");

const refreshTokens = async (req, res) => {
  const {refreshToken: oldRefreshToken} = req.body;
  const userId = req.user.id;
  if (!oldRefreshToken) {
    return res.sendStatus(401);
  }
  try {
    const {accessToken, refreshToken} = await userService.refreshTokens({
      oldRefreshToken,
      userId
    });
    return res.json({accessToken, refreshToken});
  } catch (error) {
    logger.error(`Controller -- refreshTokens --`, error);
    return res.status(400).json({error: error.message});
  }
};

const forgetPassword = async (req, res) => {
  const {email} = req.body;
  try {
    await userService.forgotPassword({email});
    return res.json({message: "Password reset link sent successfully"});
  } catch (error) {
    logger.error(`Controller -- forgetPassword --`, error);
    return res.status(400).json({error: error.message});
  }
};

const resetPassword = async (req, res) => {
  const {token, password} = req.body;
  try {
    await userService.resetPassword({token, password});
    return res.json({message: "Password updated successfully"});
  } catch (error) {
    logger.error(`Controller -- resetPassword --`, error);
    return res.status(400).json({error: error.message});
  }
};

const sendVerificationEmail = async (req, res) => {
  const {email} = req.body;
  try {
    await userService.sendVerificationEmail({email});
    return res.json({message: "Verification email sent successfully"});
  } catch (error) {
    logger.error(`Controller -- sendVerificationEmail --`, error);
    return res.status(400).json({error: error.message});
  }
};

const verifyEmail = async (req, res) => {
  const {token} = req.body;
  try {
    await userService.verifyEmail({token});
    return res.json({message: "Email verified successfully"});
  } catch (error) {
    logger.error(`Controller -- verifyEmail --`, error);
    return res.status(400).json({error: error.message});
  }
};

module.exports = {
  refreshTokens,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
