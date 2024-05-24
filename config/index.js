const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction
  ? require('./production')
  : require('./development');

module.exports = config;