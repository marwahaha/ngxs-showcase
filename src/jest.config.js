module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': `${__dirname}/mock-module.js`,
    '@shared': '<rootDir>/src/app/shared/index',
    '@core': '<rootDir>/src/app/core/index'
  }
};
