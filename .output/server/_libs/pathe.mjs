import { n as __esmMin } from "../_runtime.mjs";

//#region node_modules/pathe/dist/shared/pathe.M-eThtNZ.mjs
function normalizeWindowsPath(input = "") {
	if (!input) return input;
	return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
function normalizeString(path, allowAboveRoot) {
	let res = "";
	let lastSegmentLength = 0;
	let lastSlash = -1;
	let dots = 0;
	let char = null;
	for (let index = 0; index <= path.length; ++index) {
		if (index < path.length) char = path[index];
		else if (char === "/") break;
		else char = "/";
		if (char === "/") {
			if (lastSlash === index - 1 || dots === 1);
			else if (dots === 2) {
				if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
					if (res.length > 2) {
						const lastSlashIndex = res.lastIndexOf("/");
						if (lastSlashIndex === -1) {
							res = "";
							lastSegmentLength = 0;
						} else {
							res = res.slice(0, lastSlashIndex);
							lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
						}
						lastSlash = index;
						dots = 0;
						continue;
					} else if (res.length > 0) {
						res = "";
						lastSegmentLength = 0;
						lastSlash = index;
						dots = 0;
						continue;
					}
				}
				if (allowAboveRoot) {
					res += res.length > 0 ? "/.." : "..";
					lastSegmentLength = 2;
				}
			} else {
				if (res.length > 0) res += `/${path.slice(lastSlash + 1, index)}`;
				else res = path.slice(lastSlash + 1, index);
				lastSegmentLength = index - lastSlash - 1;
			}
			lastSlash = index;
			dots = 0;
		} else if (char === "." && dots !== -1) ++dots;
		else dots = -1;
	}
	return res;
}
var _DRIVE_LETTER_START_RE, _UNC_REGEX, _IS_ABSOLUTE_RE, _DRIVE_LETTER_RE, normalize, join, isAbsolute;
var init_pathe_M_eThtNZ = __esmMin((() => {
	_DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
	_UNC_REGEX = /^[/\\]{2}/;
	_IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
	_DRIVE_LETTER_RE = /^[A-Za-z]:$/;
	normalize = function(path) {
		if (path.length === 0) return ".";
		path = normalizeWindowsPath(path);
		const isUNCPath = path.match(_UNC_REGEX);
		const isPathAbsolute = isAbsolute(path);
		const trailingSeparator = path[path.length - 1] === "/";
		path = normalizeString(path, !isPathAbsolute);
		if (path.length === 0) {
			if (isPathAbsolute) return "/";
			return trailingSeparator ? "./" : ".";
		}
		if (trailingSeparator) path += "/";
		if (_DRIVE_LETTER_RE.test(path)) path += "/";
		if (isUNCPath) {
			if (!isPathAbsolute) return `//./${path}`;
			return `//${path}`;
		}
		return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
	};
	join = function(...segments) {
		let path = "";
		for (const seg of segments) {
			if (!seg) continue;
			if (path.length > 0) {
				const pathTrailing = path[path.length - 1] === "/";
				const segLeading = seg[0] === "/";
				if (pathTrailing && segLeading) path += seg.slice(1);
				else path += pathTrailing || segLeading ? seg : `/${seg}`;
			} else path += seg;
		}
		return normalize(path);
	};
	isAbsolute = function(p) {
		return _IS_ABSOLUTE_RE.test(p);
	};
}));
//#endregion
//#region node_modules/pathe/dist/utils.mjs
function normalizeAliases(_aliases) {
	if (_aliases[normalizedAliasSymbol]) return _aliases;
	const aliases = Object.fromEntries(Object.entries(_aliases).sort(([a], [b]) => _compareAliases(a, b)));
	for (const key in aliases) for (const alias in aliases) {
		if (alias === key || key.startsWith(alias)) continue;
		if (aliases[key]?.startsWith(alias) && pathSeparators.has(aliases[key][alias.length])) aliases[key] = aliases[alias] + aliases[key].slice(alias.length);
	}
	Object.defineProperty(aliases, normalizedAliasSymbol, {
		value: true,
		enumerable: false
	});
	return aliases;
}
function resolveAlias(path, aliases) {
	const _path = normalizeWindowsPath(path);
	aliases = normalizeAliases(aliases);
	for (const [alias, to] of Object.entries(aliases)) {
		if (!_path.startsWith(alias)) continue;
		if (hasTrailingSlash(_path[(hasTrailingSlash(alias) ? alias.slice(0, -1) : alias).length])) return join(to, _path.slice(alias.length));
	}
	return _path;
}
function _compareAliases(a, b) {
	return b.split("/").length - a.split("/").length;
}
function hasTrailingSlash(path = "/") {
	const lastChar = path[path.length - 1];
	return lastChar === "/" || lastChar === "\\";
}
var pathSeparators, normalizedAliasSymbol;
var init_utils = __esmMin((() => {
	init_pathe_M_eThtNZ();
	pathSeparators = /* @__PURE__ */ new Set([
		"/",
		"\\",
		void 0
	]);
	normalizedAliasSymbol = Symbol.for("pathe:normalizedAlias");
}));
//#endregion
export { resolveAlias as n, init_utils as t };
