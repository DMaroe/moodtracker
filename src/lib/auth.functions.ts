import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import {
  getCookie,
  setCookie,
  deleteCookie,
  getRequest,
} from "@tanstack/react-start/server";
import { z } from "zod";

const COOKIE_NAME = "mood-auth-v1";
const ONE_HOUR = 60 * 60;


/**
 * Gets APP_PASSCODE from Cloudflare Worker environment.
 * Supports different TanStack Start + Cloudflare runtime shapes.
 */
function getExpectedPasscode(): string {
  const event = getRequest();

  if (!event) {
    throw new Error("No request context available");
  }

  const ctx = event.context as any;

  const passcode =
    // TanStack Start Cloudflare adapter
    ctx?.cloudflare?.env?.APP_PASSCODE ||

    // Alternative Cloudflare binding location
    ctx?.env?.APP_PASSCODE ||

    // Nitro Cloudflare runtime
    globalThis?.__env__?.APP_PASSCODE ||

    // Local development fallback
    process.env.APP_PASSCODE;


  if (!passcode) {
    console.error(
      "Available context:",
      JSON.stringify(ctx, null, 2)
    );

    throw new Error(
      "APP_PASSCODE secret missing. Check Cloudflare Worker secret binding."
    );
  }

  return passcode;
}


/**
 * Determines whether cookie should use HTTPS only.
 */
function isSecureRequest(): boolean {
  const event = getRequest();

  const url = event?.request?.url;

  return url
    ? url.startsWith("https://")
    : process.env.NODE_ENV === "production";
}


/**
 * Protect server-only routes.
 */
export const requireAuthServer = createServerOnlyFn(() => {
  const expected = getExpectedPasscode();

  const cookie = getCookie(COOKIE_NAME);

  if (!cookie || cookie !== expected) {
    throw new Error("Unauthorized");
  }
});


/**
 * Check if current user is authenticated.
 */
export const isAuthed = createServerFn({
  method: "GET",
}).handler(async () => {

  const expected = getExpectedPasscode();

  const cookie = getCookie(COOKIE_NAME);

  return {
    authed: Boolean(cookie && cookie === expected),
  };
});


/**
 * Validate passcode and create login cookie.
 */
export const checkPasscode = createServerFn({
  method: "POST",
})
.inputValidator(
  z.object({
    passcode: z.string().min(1),
  })
)
.handler(async ({ data }) => {

  const expected = getExpectedPasscode();

  const provided = data.passcode.trim();


  if (provided !== expected) {
    throw new Error("Incorrect passcode");
  }


  setCookie(
    COOKIE_NAME,
    expected,
    {
      httpOnly: true,
      secure: isSecureRequest(),
      sameSite: "lax",
      maxAge: ONE_HOUR,
      path: "/",
    }
  );


  return {
    ok: true,
  };
});


/**
 * Logout and remove authentication cookie.
 */
export const logout = createServerFn({
  method: "POST",
}).handler(async () => {

  deleteCookie(
    COOKIE_NAME,
    {
      path: "/",
    }
  );


  return {
    ok: true,
  };
});


/**
 * Temporary debugging endpoint.
 * Remove after fixing deployment.
 */
export const debugContext = createServerFn({
  method: "GET",
}).handler(async () => {

  const event = getRequest();

  const ctx = event?.context as any;


  return {
    contextKeys: Object.keys(ctx ?? {}),

    cloudflareExists:
      Boolean(ctx?.cloudflare),

    cloudflareEnvExists:
      Boolean(ctx?.cloudflare?.env),

    appPasscodeLocations: {
      cloudflare:
        Boolean(ctx?.cloudflare?.env?.APP_PASSCODE),

      env:
        Boolean(ctx?.env?.APP_PASSCODE),

      global:
        Boolean(globalThis?.__env__?.APP_PASSCODE),

      process:
        Boolean(process.env.APP_PASSCODE),
    },
  };
});