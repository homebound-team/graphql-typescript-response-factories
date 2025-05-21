module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/integration/*.test.(ts|tsx)"],
  globalSetup: "<rootDir>/integration/globalSetup.ts",
};
