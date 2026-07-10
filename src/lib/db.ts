// Cloudflare D1 binding access.
//
// In production (deployed to Cloudflare Workers via the "cloudflare-module"
// Nitro preset), the D1 binding is attached to the request environment and
// Nitro stashes it on `globalThis.__env__` for the lifetime of the request.
//
// In local dev (`vite dev`), there is no real Workers runtime, so we fall
// back to Wrangler's `getPlatformProxy`, which spins up a local emulation of
// your bindings (backed by a local SQLite file under .wrangler/state).

import("wrangler");
import { getRequest } from "@tanstack/react-start/server";

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
      return proxy.env.moodtracker_db as unknown as D1Database;
    });
  }
  return devDbPromise;
}

export async function getDb(): Promise<D1Database> {
  // For local development
  if (import.meta.env.DEV) {
    return getDevDb();
  }

  // Get the request context
  const event = getRequest();
  const ctx = event?.context as any;

  // Check all possible locations for the D1 binding
  const db = 
    ctx?.cloudflare?.env?.moodtracker_db ||    // Cloudflare Workers with env in cloudflare property
    ctx?.env?.moodtracker_db ||                 // Cloudflare Workers with env directly on context
    (globalThis as { __env__?: { moodtracker_db?: D1Database } }).__env__?.moodtracker_db ||
    process.env.moodtracker_db;                // Fallback for other environments

  if (!db) {
    console.error("D1 binding 'DB' not found. Available context:", {
      hasCtx: !!ctx,
      hasCloudflare: !!ctx?.cloudflare,
      hasCloudflareEnv: !!ctx?.cloudflare?.env,
      hasCtxEnv: !!ctx?.env,
      hasGlobalEnv: !!(globalThis as { __env__?: any }).__env__,
      ctxKeys: ctx ? Object.keys(ctx) : [],
      envKeys: ctx?.env ? Object.keys(ctx.env) : [],
    });
    throw new Error(
      "D1 binding 'DB' not found. Check that wrangler.jsonc has a d1_databases entry named DB.",
    );
  }

  return db;
}
