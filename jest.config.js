module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/test-db.js'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js']
};
