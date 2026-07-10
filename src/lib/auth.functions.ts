import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie, getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const COOKIE_NAME = "mood-auth-v1";
const ONE_HOUR = 60 * 60;

function getExpectedPasscode(): string | undefined {
  const request = getRequest();
  return (
    (request?.context as any)?.cloudflare?.env?.APP_PASSCODE ?? process.env.APP_PASSCODE
  );
}

export const requireAuthServer = createServerOnlyFn(() => {
  const expected = getExpectedPasscode();
  const cookie = getCookie(COOKIE_NAME);
  if (!expected || cookie !== expected) {
    throw new Error("Unauthorized");
  }
});

export const isAuthed = createServerFn({ method: "GET" }).handler(async () => {
  const expected = getExpectedPasscode();
  const cookie = getCookie(COOKIE_NAME);
  return { authed: Boolean(expected) && cookie === expected };
});

export const checkPasscode = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ passcode: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const expected = getExpectedPasscode();
    if (!expected) throw new Error("Missing APP_PASSCODE on the server");
    if (data.passcode !== expected) throw new Error("Incorrect passcode");

    setCookie(COOKIE_NAME, expected, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ONE_HOUR,
      path: "/",
    });
    return { ok: true };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(COOKIE_NAME, { path: "/" });
  return { ok: true };
});

// TEMPORARY — remove after confirming the context shape. This exposes server
// context (including secrets) to anyone who calls it, so don't leave it deployed.
export const debugContext = createServerFn({ method: "GET" }).handler(async () => {
  const event = getRequestEvent();
  return { context: JSON.parse(JSON.stringify(event?.context ?? {})) };
});