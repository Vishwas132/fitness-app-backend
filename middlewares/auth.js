const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) return res.sendStatus(401);
  jwt.verify(token, config.jwt.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authenticateRefreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, config.jwt.jwtRefreshSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// TODO: Add checkRole middleware
// const checkRole = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.sendStatus(403);
//     }
//     next();
//   };
// };

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = { authenticateToken, authenticateRefreshToken, checkRole };
