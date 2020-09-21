module.exports = {
  roots: ["./tests"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
};
