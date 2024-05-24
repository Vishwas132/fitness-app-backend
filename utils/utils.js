const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  email: {emailHost, emailPort, emailUser, emailPassword},
  jwt: {jwtSecret, jwtRefreshSecret}
} = require("../config");

const sendEmail = async ({to, subject, html}) => {
  const mailTransport = getMailTransport();

  const mailOptions = {
    from: emailHost,
    to,
    subject,
    html
  };

  try {
    await mailTransport.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

const getMailTransport = () => {
  return nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    auth: {
      user: emailUser,
      pass: emailPassword
    }
  });
};

const generateAccessToken = ({userId, role}) => {
  return jwt.sign({id: userId, role}, jwtSecret, {expiresIn: "15m"});
};

const generateRefreshToken = ({userId, role}) => {
  return jwt.sign({id: userId, role}, jwtRefreshSecret, {expiresIn: "7d"});
};

const hashPassword = async password => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (providedPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(providedPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

const generateForgotPasswordToken = user => {
  return jwt.sign({id: user.id, email: user.email}, jwtSecret, {
    expiresIn: "1d"
  });
};

const generateVerificationToken = user => {
  return jwt.sign({id: user.id, email: user.email}, jwtSecret, {
    expiresIn: "1d"
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  generateForgotPasswordToken,
  generateVerificationToken,
  sendEmail
};
