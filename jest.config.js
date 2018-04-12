module.exports = {
  testPathIgnorePatterns: ['/node_modules', '/jest/'],
  collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**'],
  globalSetup: './jest/setup.js',
  globalTeardown: './jest/teardown.js',
  testEnvironment: './jest/mongo-environment.js'
};
