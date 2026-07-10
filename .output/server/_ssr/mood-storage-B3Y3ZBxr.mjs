//#region node_modules/.nitro/vite/services/ssr/assets/mood-storage-B3Y3ZBxr.js
var CURRENT = "mood-current-v1";
function setCurrent(entry) {
	sessionStorage.setItem(CURRENT, JSON.stringify(entry));
}
function getCurrent() {
	if (typeof window === "undefined") return null;
	try {
		const v = sessionStorage.getItem(CURRENT);
		return v ? JSON.parse(v) : null;
	} catch {
		return null;
	}
}
//#endregion
export { setCurrent as n, getCurrent as t };
