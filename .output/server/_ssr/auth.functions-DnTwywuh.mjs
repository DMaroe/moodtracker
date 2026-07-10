import { _ as getRequest, b as setCookie$1, g as getCookie, h as deleteCookie$1, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import process from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-DnTwywuh.js
var COOKIE_NAME = "mood-auth-v1";
var ONE_HOUR = 3600;
/**
* Gets APP_PASSCODE from Cloudflare Worker environment.
* Supports different TanStack Start + Cloudflare runtime shapes.
*/
function getExpectedPasscode() {
	const event = getRequest();
	if (!event) throw new Error("No request context available");
	const ctx = event.context;
	const passcode = ctx?.cloudflare?.env?.APP_PASSCODE || ctx?.env?.APP_PASSCODE || globalThis?.__env__?.APP_PASSCODE || process.env.APP_PASSCODE;
	if (!passcode) {
		console.error("Available context:", JSON.stringify(ctx, null, 2));
		throw new Error("APP_PASSCODE secret missing. Check Cloudflare Worker secret binding.");
	}
	return passcode;
}
/**
* Determines whether cookie should use HTTPS only.
*/
function isSecureRequest() {
	const url = getRequest()?.request?.url;
	return url ? url.startsWith("https://") : true;
}
/**
* Protect server-only routes.
*/
var isAuthed_createServerFn_handler = createServerRpc({
	id: "dfd087223224f114e56400ccb848ed9f1e8981ed9d83adf2cf0deeda19d4fb4e",
	name: "isAuthed",
	filename: "src/lib/auth.functions.ts"
}, (opts) => isAuthed.__executeServer(opts));
var isAuthed = createServerFn({ method: "GET" }).handler(isAuthed_createServerFn_handler, async () => {
	const expected = getExpectedPasscode();
	const cookie = getCookie(COOKIE_NAME);
	return { authed: Boolean(cookie && cookie === expected) };
});
var checkPasscode_createServerFn_handler = createServerRpc({
	id: "0a2efa4f0523f63126d71c02f99be95e7acd4822aae8b631133fe9d48867236a",
	name: "checkPasscode",
	filename: "src/lib/auth.functions.ts"
}, (opts) => checkPasscode.__executeServer(opts));
var checkPasscode = createServerFn({ method: "POST" }).inputValidator(objectType({ passcode: stringType().min(1) })).handler(checkPasscode_createServerFn_handler, async ({ data }) => {
	const expected = getExpectedPasscode();
	if (data.passcode.trim() !== expected) throw new Error("Incorrect passcode");
	setCookie$1(COOKIE_NAME, expected, {
		httpOnly: true,
		secure: isSecureRequest(),
		sameSite: "lax",
		maxAge: ONE_HOUR,
		path: "/"
	});
	return { ok: true };
});
var logout_createServerFn_handler = createServerRpc({
	id: "452e3e86c202416aafc02a2b55b578ec43fec039a5a067befd21bb3ba85f5fd5",
	name: "logout",
	filename: "src/lib/auth.functions.ts"
}, (opts) => logout.__executeServer(opts));
var logout = createServerFn({ method: "POST" }).handler(logout_createServerFn_handler, async () => {
	deleteCookie$1(COOKIE_NAME, { path: "/" });
	return { ok: true };
});
var debugContext_createServerFn_handler = createServerRpc({
	id: "a5bec5374303f3f008a3dd37820012a7cc0c126cff575454855636971c21f27b",
	name: "debugContext",
	filename: "src/lib/auth.functions.ts"
}, (opts) => debugContext.__executeServer(opts));
var debugContext = createServerFn({ method: "GET" }).handler(debugContext_createServerFn_handler, async () => {
	const ctx = getRequest()?.context;
	return {
		contextKeys: Object.keys(ctx ?? {}),
		cloudflareExists: Boolean(ctx?.cloudflare),
		cloudflareEnvExists: Boolean(ctx?.cloudflare?.env),
		appPasscodeLocations: {
			cloudflare: Boolean(ctx?.cloudflare?.env?.APP_PASSCODE),
			env: Boolean(ctx?.env?.APP_PASSCODE),
			global: Boolean(globalThis?.__env__?.APP_PASSCODE),
			process: Boolean(process.env.APP_PASSCODE)
		}
	};
});
//#endregion
export { checkPasscode_createServerFn_handler, debugContext_createServerFn_handler, isAuthed_createServerFn_handler, logout_createServerFn_handler };
