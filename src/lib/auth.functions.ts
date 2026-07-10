import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie, getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const COOKIE_NAME = "mood-auth-v1";
const ONE_HOUR = 60 * 60;

function getExpectedPasscode(): string | undefined {
  const event = getRequest();
  const ctx = event?.context as any;
  return (
    ctx?.cloudflare?.env?.APP_PASSCODE ??
    ctx?.env?.APP_PASSCODE ??
    process.env.APP_PASSCODE
  );
}

function isSecureRequest(): boolean {
  const event = getRequest();
  const url = event?.request?.url;
  return url ? url.startsWith("https://") : process.env.NODE_ENV === "production";
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
      secure: isSecureRequest(),
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

// TEMPORARY — remove after confirming the context shape.
export const debugContext = createServerFn({ method: "GET" }).handler(async () => {
  const event = getRequest();
  return { context: JSON.parse(JSON.stringify(event?.context ?? {})) };
});