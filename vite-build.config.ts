import { defineConfig } from "vite";

export default defineConfig({
  build: {
    polyfillDynamicImport: false,
    assetsInlineLimit: 512,
    // target: "es",
    lib: {
      name: "dotenvCache",
      entry: "lib/index.ts",
      formats: ["umd"],
    },
    minify: "terser",
    emptyOutDir: true,
    outDir: "umd",
    brotliSize: false,
    manifest: false,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["fs", "path"],
    },
  },
  optimizeDeps: {
    exclude: ["monaco-editor", "vscode"],
  },
  esbuild: {
    jsxFactory: "aoife",
    jsxFragment: "aoife.Frag",
  },
});
