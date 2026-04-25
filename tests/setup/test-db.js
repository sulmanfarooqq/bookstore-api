const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { disconnectDatabase } = require('../../src/config/database');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map((collection) => collection.deleteMany({}))
  );
});

afterAll(async () => {
  await disconnectDatabase();

  if (mongoServer) {
    await mongoServer.stop();
  }
});
