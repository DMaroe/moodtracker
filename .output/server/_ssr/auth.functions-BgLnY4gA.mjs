import { _ as getRequest, g as getCookie, i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DQ57NWOq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-BgLnY4gA.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var COOKIE_NAME = "mood-auth-v1";
function getExpectedPasscode() {
	const ctx = getRequest()?.context;
	const passcode = ctx?.cloudflare?.env?.APP_PASSCODE ?? ctx?.env?.APP_PASSCODE;
	if (!passcode) throw new Error("APP_PASSCODE secret is missing from Cloudflare Worker environment");
	return passcode;
}
var requireAuthServer = () => {
	const expected = getExpectedPasscode();
	const cookie = getCookie(COOKIE_NAME);
	if (!cookie || cookie !== expected) throw new Error("Unauthorized");
};
var isAuthed = createServerFn({ method: "GET" }).handler(createSsrRpc("dfd087223224f114e56400ccb848ed9f1e8981ed9d83adf2cf0deeda19d4fb4e"));
var checkPasscode = createServerFn({ method: "POST" }).validator((data) => objectType({ passcode: stringType().min(1) }).parse(data)).handler(createSsrRpc("0a2efa4f0523f63126d71c02f99be95e7acd4822aae8b631133fe9d48867236a"));
var logout = createServerFn({ method: "POST" }).handler(createSsrRpc("452e3e86c202416aafc02a2b55b578ec43fec039a5a067befd21bb3ba85f5fd5"));
//#endregion
export { requireAuthServer as a, logout as i, createSsrRpc as n, isAuthed as r, checkPasscode as t };
