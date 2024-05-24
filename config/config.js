const config = require('../config');
console.log(config);
module.exports = {
  [process.env.NODE_ENV || 'development']: {...config.db},
};