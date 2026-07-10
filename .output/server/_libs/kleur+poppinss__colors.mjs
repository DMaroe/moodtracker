import { n as __esmMin } from "../_runtime.mjs";
import processModule from "node:process";
//#region node_modules/kleur/index.mjs
function run(arr, str) {
	let i = 0, tmp, beg = "", end = "";
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (!!~str.indexOf(tmp.close)) str = str.replace(tmp.rgx, tmp.close + tmp.open);
	}
	return beg + str + end;
}
function chain(has, keys) {
	let ctx = {
		has,
		keys
	};
	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);
	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);
	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);
	return ctx;
}
function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, "g")
	};
	return function(txt) {
		if (this !== void 0 && this.has !== void 0) {
			~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
	};
}
var FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY, $;
var init_kleur = __esmMin((() => {
	isTTY = true;
	if (typeof processModule !== "undefined") {
		({FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM} = processModule.env || {});
		isTTY = processModule.stdout && processModule.stdout.isTTY;
	}
	$ = {
		enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY),
		reset: init(0, 0),
		bold: init(1, 22),
		dim: init(2, 22),
		italic: init(3, 23),
		underline: init(4, 24),
		inverse: init(7, 27),
		hidden: init(8, 28),
		strikethrough: init(9, 29),
		black: init(30, 39),
		red: init(31, 39),
		green: init(32, 39),
		yellow: init(33, 39),
		blue: init(34, 39),
		magenta: init(35, 39),
		cyan: init(36, 39),
		white: init(37, 39),
		gray: init(90, 39),
		grey: init(90, 39),
		bgBlack: init(40, 49),
		bgRed: init(41, 49),
		bgGreen: init(42, 49),
		bgYellow: init(43, 49),
		bgBlue: init(44, 49),
		bgMagenta: init(45, 49),
		bgCyan: init(46, 49),
		bgWhite: init(47, 49)
	};
}));
//#endregion
//#region node_modules/@poppinss/colors/build/index.js
var Colors, Raw, Kleur, Silent, colors_default;
var init_build = __esmMin((() => {
	init_kleur();
	Colors = class {
		black(text) {
			return this.transform("black", text);
		}
		red(text) {
			return this.transform("red", text);
		}
		green(text) {
			return this.transform("green", text);
		}
		yellow(text) {
			return this.transform("yellow", text);
		}
		blue(text) {
			return this.transform("blue", text);
		}
		magenta(text) {
			return this.transform("magenta", text);
		}
		cyan(text) {
			return this.transform("cyan", text);
		}
		white(text) {
			return this.transform("white", text);
		}
		gray(text) {
			return this.transform("gray", text);
		}
		grey(text) {
			return this.transform("grey", text);
		}
		bgBlack(text) {
			return this.transform("bgBlack", text);
		}
		bgRed(text) {
			return this.transform("bgRed", text);
		}
		bgGreen(text) {
			return this.transform("bgGreen", text);
		}
		bgYellow(text) {
			return this.transform("bgYellow", text);
		}
		bgBlue(text) {
			return this.transform("bgBlue", text);
		}
		bgMagenta(text) {
			return this.transform("bgMagenta", text);
		}
		bgCyan(text) {
			return this.transform("bgCyan", text);
		}
		bgWhite(text) {
			return this.transform("bgWhite", text);
		}
		reset(text) {
			return this.transform("reset", text);
		}
		bold(text) {
			return this.transform("bold", text);
		}
		dim(text) {
			return this.transform("dim", text);
		}
		italic(text) {
			return this.transform("italic", text);
		}
		underline(text) {
			return this.transform("underline", text);
		}
		inverse(text) {
			return this.transform("inverse", text);
		}
		hidden(text) {
			return this.transform("hidden", text);
		}
		strikethrough(text) {
			return this.transform("strikethrough", text);
		}
	};
	Raw = class extends Colors {
		#transformations = [];
		#dispose(value, callback) {
			callback();
			return value;
		}
		transform(transformation, text) {
			this.#transformations.push(transformation);
			if (text !== void 0) {
				const transformations = this.#transformations.concat([text]).join("(");
				const closingWrapping = new Array(this.#transformations.length + 1).join(")");
				return this.#dispose(`${transformations}${closingWrapping}`, () => {
					this.#transformations = [];
				});
			}
			return this;
		}
	};
	Kleur = class extends Colors {
		#chain;
		constructor() {
			super();
			$.enabled = true;
		}
		#dispose(value, callback) {
			callback();
			return value;
		}
		transform(transformation, text) {
			if (text !== void 0) {
				if (this.#chain) return this.#dispose(this.#chain[transformation](text), () => {
					this.#chain = void 0;
				});
				return $[transformation](text);
			}
			if (this.#chain) this.#chain = this.#chain[transformation]();
			else this.#chain = $[transformation]();
			return this;
		}
	};
	Silent = class extends Colors {
		transform(_, text) {
			if (text !== void 0) return String(text);
			return this;
		}
	};
	colors_default = {
		ansi() {
			return new Kleur();
		},
		silent() {
			return new Silent();
		},
		raw() {
			return new Raw();
		}
	};
}));
//#endregion
export { init_build as n, colors_default as t };
