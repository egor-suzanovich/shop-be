module.exports = {
  clearMocks: false,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/.serverless/',
    '<rootDir>/.webpack/',
    '<rootDir>/jest/',
    '<rootDir>/node_modules/',
    '<rootDir>/test/',
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'text',
    'html',
    'lcov',
    ['lcovonly', { projectRoot: __dirname }],
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 80,
      statements: 80,
    }
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  modulePathIgnorePatterns: [
    '<rootDir>/.serverless/',
    '<rootDir>/.webpack/',
    '<rootDir>/jest/',
    '<rootDir>/node-modules/',
    'node_modules'
  ],
  modulePaths: [
    '<rootDir>/src/',
    '<rootDir>/node_modules/',
  ],
  roots: [
    '<rootDir>',
  ],
  testEnvironment: 'node',
  testTimeout: 20000,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  rootDir: './',
};
