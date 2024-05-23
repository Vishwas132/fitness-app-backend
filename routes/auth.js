const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authenticateRefreshToken
} = require("../middlewares/auth");
const {
  refreshTokens,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
} = require("../controllers/auth");

router.post("/refresh-tokens", authenticateRefreshToken, refreshTokens);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", authenticateToken, resetPassword);
router.post("/send-verification-email", sendVerificationEmail);
router.post("/verify-email", authenticateToken, verifyEmail);

module.exports = router;
