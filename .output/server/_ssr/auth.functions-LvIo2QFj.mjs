import { _ as getRequest, b as setCookie$1, g as getCookie, h as deleteCookie$1, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import process from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-LvIo2QFj.js
var COOKIE_NAME = "mood-auth-v1";
var ONE_HOUR = 3600;
function getExpectedPasscode() {
	return (getRequest()?.context)?.cloudflare?.env?.APP_PASSCODE ?? process.env.APP_PASSCODE;
}
var isAuthed_createServerFn_handler = createServerRpc({
	id: "dfd087223224f114e56400ccb848ed9f1e8981ed9d83adf2cf0deeda19d4fb4e",
	name: "isAuthed",
	filename: "src/lib/auth.functions.ts"
}, (opts) => isAuthed.__executeServer(opts));
var isAuthed = createServerFn({ method: "GET" }).handler(isAuthed_createServerFn_handler, async () => {
	const expected = getExpectedPasscode();
	const cookie = getCookie(COOKIE_NAME);
	return { authed: Boolean(expected) && cookie === expected };
});
var checkPasscode_createServerFn_handler = createServerRpc({
	id: "0a2efa4f0523f63126d71c02f99be95e7acd4822aae8b631133fe9d48867236a",
	name: "checkPasscode",
	filename: "src/lib/auth.functions.ts"
}, (opts) => checkPasscode.__executeServer(opts));
var checkPasscode = createServerFn({ method: "POST" }).inputValidator((data) => objectType({ passcode: stringType().min(1) }).parse(data)).handler(checkPasscode_createServerFn_handler, async ({ data }) => {
	const expected = getExpectedPasscode();
	if (!expected) throw new Error("Missing APP_PASSCODE on the server");
	if (data.passcode !== expected) throw new Error("Incorrect passcode");
	setCookie$1(COOKIE_NAME, expected, {
		httpOnly: true,
		secure: true,
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
//#endregion
export { checkPasscode_createServerFn_handler, isAuthed_createServerFn_handler, logout_createServerFn_handler };
