import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  // Vitest 4 bundles rolldown-vite (oxc). tsconfig has `jsx: "preserve"` (the
  // app build uses @vitejs/plugin-react), so force JSX transform here.
  oxc: { jsx: { runtime: "automatic" } },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["client/src/__tests__/setup.ts"],
    include: ["client/src/__tests__/**/*.test.tsx"],
    testTimeout: 20000,
  },
});
