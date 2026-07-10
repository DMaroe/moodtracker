import { Buffer } from "node:buffer";
import crypto from "node:crypto";
//#region node_modules/nanoid/url-alphabet/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
//#endregion
//#region node_modules/nanoid/index.js
var POOL_SIZE_MULTIPLIER = 128;
var pool, poolOffset;
var fillPool = (bytes) => {
	if (bytes < 0 || bytes > 1024) throw new RangeError("Wrong ID size");
	if (!pool || pool.length < bytes) {
		pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
		crypto.randomFillSync(pool);
		poolOffset = 0;
	} else if (poolOffset + bytes > pool.length) {
		crypto.randomFillSync(pool);
		poolOffset = 0;
	}
	poolOffset += bytes;
};
var nanoid = (size = 21) => {
	fillPool(size |= 0);
	let id = "";
	for (let i = poolOffset - size; i < poolOffset; i++) id += urlAlphabet[pool[i] & 63];
	return id;
};
//#endregion
export { nanoid as t };
