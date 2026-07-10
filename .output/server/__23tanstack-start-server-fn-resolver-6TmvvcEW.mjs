//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-6TmvvcEW.js
var manifest = {
	"0a2efa4f0523f63126d71c02f99be95e7acd4822aae8b631133fe9d48867236a": {
		functionName: "checkPasscode_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-DfAvAvu3.mjs")
	},
	"27384186f0a56f6a847572e12cbbb3c4101cbf121f80f2f426ab16ca0f9b17f2": {
		functionName: "saveMoodEntry_createServerFn_handler",
		importer: () => import("./_ssr/mood.functions-GqFgRapw.mjs")
	},
	"452e3e86c202416aafc02a2b55b578ec43fec039a5a067befd21bb3ba85f5fd5": {
		functionName: "logout_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-DfAvAvu3.mjs")
	},
	"cf44db3b26cb418d684ada8bac31e647ad82afea844ef1a688ce92d4fbe261d4": {
		functionName: "analyzeMood_createServerFn_handler",
		importer: () => import("./_ssr/mood.functions-GqFgRapw.mjs")
	},
	"dfd087223224f114e56400ccb848ed9f1e8981ed9d83adf2cf0deeda19d4fb4e": {
		functionName: "isAuthed_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-DfAvAvu3.mjs")
	},
	"f2c4037bda4ef45327dd656edd161462d1ea4919da6f14e642db817872fd062f": {
		functionName: "listMoodEntries_createServerFn_handler",
		importer: () => import("./_ssr/mood.functions-GqFgRapw.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
