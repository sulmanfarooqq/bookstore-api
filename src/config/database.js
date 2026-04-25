const mongoose = require('mongoose');

let cachedConnectionPromise;

const connectDatabase = async (connectionString) => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedConnectionPromise) {
    cachedConnectionPromise = mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 10000
    });
  }

  try {
    await cachedConnectionPromise;
  } catch (error) {
    cachedConnectionPromise = null;
    throw error;
  }

  if (mongoose.connection.readyState !== 1) {
    cachedConnectionPromise = null;
    throw new Error('MongoDB connection was not established');
  }

  if (!connectDatabase.hasLoggedSuccess) {
    console.log('MongoDB connected successfully');
    connectDatabase.hasLoggedSuccess = true;
  }

  return mongoose.connection;
};

const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  cachedConnectionPromise = null;
  connectDatabase.hasLoggedSuccess = false;
};

connectDatabase.hasLoggedSuccess = false;

module.exports = { connectDatabase, disconnectDatabase };
