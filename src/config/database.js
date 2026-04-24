const mongoose = require('mongoose');

const connectDatabase = async (connectionString) => {
  await mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 10000
  });

  console.log('MongoDB connected successfully');
};

module.exports = { connectDatabase };
