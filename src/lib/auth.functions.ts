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

function getExpectedPasscode(): string {
  const event = getRequest();

  const ctx = event?.context as any;

  const passcode =
    ctx?.cloudflare?.env?.APP_PASSCODE ??
    ctx?.env?.APP_PASSCODE;

  if (!passcode) {
    throw new Error(
      "APP_PASSCODE secret is missing from Cloudflare Worker environment"
    );
  }

  return passcode;
}

function isSecureRequest(): boolean {
  const event = getRequest();

  const url = event?.request?.url;

  return url
    ? url.startsWith("https://")
    : process.env.NODE_ENV === "production";
}


export const requireAuthServer = createServerOnlyFn(() => {
  const expected = getExpectedPasscode();

  const cookie = getCookie(COOKIE_NAME);

  if (!cookie || cookie !== expected) {
    throw new Error("Unauthorized");
  }
});


export const isAuthed = createServerFn({
  method: "GET",
}).handler(async () => {
  const expected = getExpectedPasscode();

  const cookie = getCookie(COOKIE_NAME);

  return {
    authed: cookie === expected,
  };
});


export const checkPasscode = createServerFn({
  method: "POST",
})
.inputValidator((data: unknown) =>
  z.object({
    passcode: z.string().min(1),
  }).parse(data)
)
.handler(async ({ data }) => {

  const expected = getExpectedPasscode();

  const providedPasscode = data.passcode.trim();

  if (providedPasscode !== expected) {
    throw new Error("Incorrect passcode");
  }


  setCookie(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: isSecureRequest(),
    sameSite: "lax",
    maxAge: ONE_HOUR,
    path: "/",
  });


  return {
    ok: true,
  };
});


export const logout = createServerFn({
  method: "POST",
}).handler(async () => {

  deleteCookie(COOKIE_NAME, {
    path: "/",
  });

  return {
    ok: true,
  };
});