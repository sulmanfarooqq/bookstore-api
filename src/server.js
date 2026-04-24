require('dotenv').config();

const app = require('./app');
const { connectDatabase } = require('./config/database');
const { env } = require('./config/env');

const startServer = async () => {
  await connectDatabase(env.mongodbUri);

  const server = app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
  });

  const shutdown = (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(() => process.exit(0));
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
