module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "./src/.*\\.(test|spec)?\\.(ts|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/test/setup-tests.ts"],
};
