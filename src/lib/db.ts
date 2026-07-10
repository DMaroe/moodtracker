// Cloudflare D1 binding access.
//
// In production (deployed to Cloudflare Workers via the "cloudflare-module"
// Nitro preset), the D1 binding is attached to the request environment and
// Nitro stashes it on `globalThis.__env__` for the lifetime of the request.
//
// In local dev (`vite dev`), there is no real Workers runtime, so we fall
// back to Wrangler's `getPlatformProxy`, which spins up a local emulation of
// your bindings (backed by a local SQLite file under .wrangler/state).

import("wrangler")
type D1Result<T = unknown> = { results: T[] };
type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement;
  run: () => Promise<unknown>;
  all: <T = unknown>() => Promise<D1Result<T>>;
};
export type D1Database = {
  prepare: (query: string) => D1PreparedStatement;
};

let devDbPromise: Promise<D1Database> | null = null;

async function getDevDb(): Promise<D1Database> {
  if (!devDbPromise) {
    devDbPromise = import("wrangler").then(async ({ getPlatformProxy }) => {
      const proxy = await getPlatformProxy();
      return proxy.env.DB as unknown as D1Database;
    });
  }
  return devDbPromise;
}

export async function getDb(): Promise<D1Database> {
  if (import.meta.env.DEV) {
    return getDevDb();
  }
  const env = (globalThis as { __env__?: { DB?: D1Database } }).__env__;
  if (!env?.DB) {
    throw new Error(
      "D1 binding 'DB' not found. Check that wrangler.jsonc has a d1_databases entry named DB.",
    );
  }
  return env.DB;
}
