import { n as __esmMin, r as __exportAll } from "../_runtime.mjs";
import processModule from "node:process";
//#region node_modules/blake3-wasm/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({});
var init_esm = __esmMin((() => {
	if (processModule.browser) throw new Error("You tried to import the Node.js version of blake3, instead of the browser version, in your build. You can fix this by importing \"blake3/browser\" instead of \"blake3\"");
}));
//#endregion
export { init_esm as n, esm_exports as t };
