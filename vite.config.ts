import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "prisma",
    setupFiles: "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
    dir: "src",
  },
});
