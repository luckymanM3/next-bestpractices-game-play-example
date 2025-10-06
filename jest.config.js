require('dotenv').config();
const nextJest = require('next/jest');
const tsconfig = require('./tsconfig');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  modulePathIgnorePatterns: ['<rootDir>/playwright/'],
  moduleNameMapper: {
    ...moduleNameMapper,
    '^.+\\.(svg)$': '<rootDir>/.jest/__mocks__/svgr.js',
    '^preact(/(.*)|$)': 'preact$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
