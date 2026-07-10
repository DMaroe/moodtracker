// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },

  // Fix: wrangler's bundled blake3-wasm package leaks into the SSR/Nitro build graph
  // and its ESM entry (./node.js) can't be resolved by Rolldown when targeting the
  // cloudflare-module Worker runtime. Externalize both so they're never bundled.
  vite: {
    ssr: {
      external: ["wrangler", "blake3-wasm"],
    },
    build: {
      rollupOptions: {
        external: ["wrangler", "blake3-wasm"],
      },
    },
  },
});
