// jest.config.js
module.exports = {
    testEnvironment: 'node',
    reporters: [
      'default',
      [
        'jest-junit',
        {
          outputDirectory: 'test-reports', // Directory to store reports
          outputName: 'jest-test-results.xml', // Name of the report file
        },
      ],
    ],
  };
  