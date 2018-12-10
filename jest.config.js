const { defaults } = require("jest-config");
module.exports = {
  testEnvironment: "node",
  verbose: true,
  testURL: "http://localhost/",
  collectCoverage: true,
  coveragePathIgnorePatterns: [".config.js", "coverage"],
  collectCoverageFrom: ["**/*.{js}", "!**/node_modules/**", "!**/vendor/**"]
};
