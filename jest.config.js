module.exports = {
  roots: ['<rootDir>/packages/core'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '.*.(test|spec).(ts)?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/packages/core/**/*.ts'],
  testTimeout: 20000
};
