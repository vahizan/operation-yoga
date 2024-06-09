const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/prismaMockSingleton.ts",
  ],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/components/$1",

    "^@/pages/(.*)$": "<rootDir>/pages/$1",

    "^@/ui/(.*)$": "<rootDir>/ui/$1",

    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",

    "@/auth": "<rootDir>/authMocks/auth.ts",
    "next-auth/providers/credentials":
      "<rootDir>/authMocks/next-auth-providers-credentials.ts",
    "next-auth": "<rootDir>/authMocks/next-auth.ts",
  },
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
