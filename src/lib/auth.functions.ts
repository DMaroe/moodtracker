import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const COOKIE_NAME = "mood-auth-v1";
const ONE_YEAR = 60 * 60 * 24 * 365;

// Used inside other server functions (analyzeMood, listMoodEntries, saveMoodEntry)
// so that those endpoints are protected even if someone calls them directly,
// bypassing the UI route guard.
//
// This must be wrapped in createServerOnlyFn (not a plain exported function):
// this file is imported transitively by client route code (via require-auth.ts
// and mood.functions.ts), and createServerOnlyFn is what tells the TanStack
// Start compiler to strip this implementation — and its server-only
// `getCookie` import — out of the client bundle entirely.
export const requireAuthServer = createServerOnlyFn(() => {
  const expected = process.env.APP_PASSCODE;
  const cookie = getCookie(COOKIE_NAME);
  if (!expected || cookie !== expected) {
    throw new Error("Unauthorized");
  }
});

export const isAuthed = createServerFn({ method: "GET" }).handler(async () => {
  const expected = process.env.APP_PASSCODE;
  const cookie = getCookie(COOKIE_NAME);
  return { authed: Boolean(expected) && cookie === expected };
});

export const checkPasscode = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ passcode: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env.APP_PASSCODE;
    if (!expected) throw new Error("Missing APP_PASSCODE on the server");
    if (data.passcode !== expected) throw new Error("Incorrect passcode");

    setCookie(COOKIE_NAME, expected, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ONE_YEAR,
      path: "/",
    });
    return { ok: true };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(COOKIE_NAME, { path: "/" });
  return { ok: true };
});