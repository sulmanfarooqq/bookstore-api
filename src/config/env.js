const requiredEnvVars = ['MONGODB_URI'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar] && process.env.NODE_ENV !== 'test') {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookstore-api'
};

module.exports = { env };
