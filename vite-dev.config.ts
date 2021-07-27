import { defineConfig } from "vite";

export default defineConfig({
  build: {
    polyfillDynamicImport: false,
    assetsInlineLimit: 512,
    // target: "es",
    lib: {
      name: "dotenvCache",
      entry: "example/index.ts",
      formats: ["umd"],
    },
    minify: "terser",
    emptyOutDir: true,
    outDir: "dist",
    brotliSize: false,
    manifest: false,
  },
  optimizeDeps: {
    exclude: ["monaco-editor", "vscode"],
  },
  esbuild: {
    jsxFactory: "aoife",
    jsxFragment: "aoife.Frag",
  },
});
