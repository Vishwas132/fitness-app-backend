module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "fitness_app",
    schema: process.env.SCHEMA_NAME || "fitness_app",
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key",
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || "1h",
    jwtRefreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME || "7d"
  },
  email: {
    emailHost: process.env.EMAIL_HOST || "smtp.googlemail.com",
    emailPort: process.env.EMAIL_PORT || 587,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD
  }
};
