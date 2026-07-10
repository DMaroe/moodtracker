import { n as __esmMin } from "../_runtime.mjs";
//#region node_modules/@speed-highlight/core/dist/index.js
async function Zt$1(t, e, p) {
	try {
		let n, m, c = {}, i, r = [], h = 0, y = typeof e == "string" ? await (b$1[e] ?? (b$1[e] = Se$1(`./languages/${e}.js`))) : e, g = [...typeof e == "string" ? y.default : e.sub];
		for (; h < t.length;) {
			for (c.index = null, n = g.length; n-- > 0;) {
				if (m = g[n].expand ? U$1[g[n].expand] : g[n], r[n] === void 0 || r[n].match.index < h) {
					if (m.match.lastIndex = h, i = m.match.exec(t), i === null) {
						g.splice(n, 1), r.splice(n, 1);
						continue;
					}
					r[n] = {
						match: i,
						lastIndex: m.match.lastIndex
					};
				}
				r[n].match[0] && (r[n].match.index <= c.index || c.index === null) && (c = {
					part: m,
					index: r[n].match.index,
					match: r[n].match[0],
					end: r[n].lastIndex
				});
			}
			if (c.index === null) break;
			p(t.slice(h, c.index), y.type), h = c.end, c.part.sub ? await Zt$1(c.match, typeof c.part.sub == "string" ? c.part.sub : typeof c.part.sub == "function" ? c.part.sub(c.match) : c.part, p) : p(c.match, c.part.type);
		}
		p(t.slice(h, t.length), y.type);
	} catch {
		p(t);
	}
}
async function we$1(t, e, p = !0, n = {}) {
	let m = "";
	return await Zt$1(t, e, (c, i) => m += De$1(Ce$1(c), i)), p ? `<div><div class="shj-numbers">${"<div></div>".repeat(!n.hideLineNumbers && t.split(`
`).length)}</div><div>${m}</div></div>` : m;
}
var Xt$1, w$1, a$1, s$1, P$1, Wt$1, F$1, $$1, M$1, T, f, v$1, jt$1, B$1, G$1, Kt$1, H$1, _$1, Vt$1, k$1, z$1, qt$1, Y$1, Z$1, I$1, N$1, X$1, Qt$1, W$1, j$1, Jt$1, K$1, V$1, te$1, q$1, J$1, Q$1, ee$1, u$1, l$1, o, A$1, R$1, tt$1, ae$1, et$1, se$1, E$1, d$1, at$1, pe$1, st$1, pt$1, ne$1, nt$1, ct$1, ce$1, mt$1, rt$1, O$1, L$1, ot$1, me$1, re$1, ut$1, lt$1, x$1, oe$1, S$1, Et$1, ue$1, le$1, ht$1, it$1, Ee$1, gt$1, dt$1, C$1, D$1, bt$1, he$1, yt$1, Tt$1, ie$1, ft$1, It$1, ge$1, Nt$1, At$1, de$1, Rt$1, Ot$1, be$1, Lt$1, xt$1, ye$1, St$1, Ct$1, Te$1, Dt$1, wt$1, fe$1, Ie$1, Ut$1, Pt$1, Ne$1, Ft$1, Mt$1, Ae$1, $t$1, vt$1, Re$1, Bt$1, Gt$1, Oe$1, Ht$1, _t$1, Le$1, kt$1, zt$1, xe$1, Yt$1, U$1, Se$1, b$1, Ce$1, De$1;
var init_dist = __esmMin((() => {
	Xt$1 = Object.defineProperty;
	w$1 = (t) => (e) => {
		var p = t[e];
		if (p) return p();
		throw new Error("Module not found in bundle: " + e);
	};
	a$1 = (t, e) => () => (t && (e = t(t = 0)), e);
	s$1 = (t, e) => {
		for (var p in e) Xt$1(t, p, {
			get: e[p],
			enumerable: !0
		});
	};
	P$1 = {};
	s$1(P$1, { default: () => Wt$1 });
	F$1 = a$1(() => {
		Wt$1 = [
			{
				type: "cmnt",
				match: /(;|#).*/gm
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "num",
				match: /\$[\da-fA-F]*\b/g
			},
			{
				type: "kwd",
				match: /^[a-z]+\s+[a-z.]+\b/gm,
				sub: [{
					type: "func",
					match: /^[a-z]+/g
				}]
			},
			{
				type: "kwd",
				match: /^\t*[a-z][a-z\d]*\b/gm
			},
			{
				match: /%|\$/g,
				type: "oper"
			}
		];
	});
	$$1 = {};
	s$1($$1, { default: () => T });
	f = a$1(() => {
		M$1 = {
			type: "var",
			match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g
		}, T = [
			{
				sub: "todo",
				match: /#.*/g
			},
			{
				type: "str",
				match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,
				sub: [M$1]
			},
			{
				type: "oper",
				match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi
			},
			{
				type: "kwd",
				match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g
			},
			{ expand: "num" },
			{
				type: "func",
				match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gim
			},
			{
				type: "bool",
				match: /(?<=\s|^)(true|false)(?=\s|$)/g
			},
			{
				type: "oper",
				match: /[=(){}<>!]+/g
			},
			{
				type: "var",
				match: /(?<=\s|^)[\w_]+(?=\s*=)/g
			},
			M$1
		];
	});
	v$1 = {};
	s$1(v$1, { default: () => jt$1 });
	B$1 = a$1(() => {
		jt$1 = [
			{
				match: /[^\[\->+.<\]\s].*/g,
				sub: "todo"
			},
			{
				type: "func",
				match: /\.+/g
			},
			{
				type: "kwd",
				match: /[<>]+/g
			},
			{
				type: "oper",
				match: /[+-]+/g
			}
		];
	});
	G$1 = {};
	s$1(G$1, { default: () => Kt$1 });
	H$1 = a$1(() => {
		Kt$1 = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /#\s*include (<.*>|".*")/g,
				sub: [{
					type: "str",
					match: /(<|").*/g
				}]
			},
			{
				match: /asm\s*{[^}]*}/g,
				sub: [{
					type: "kwd",
					match: /^asm/g
				}, {
					match: /[^{}]*(?=}$)/g,
					sub: "asm"
				}]
			},
			{
				type: "kwd",
				match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*\()/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			}
		];
	});
	_$1 = {};
	s$1(_$1, { default: () => Vt$1 });
	k$1 = a$1(() => {
		Vt$1 = [
			{
				match: /\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "kwd",
				match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g
			},
			{
				type: "var",
				match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g
			},
			{
				type: "func",
				match: /#[\w-]+(?=[^{}]*{)/g
			},
			{
				type: "num",
				match: /#[\da-f]{3,8}/g
			},
			{
				type: "num",
				match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g,
				sub: [{
					type: "var",
					match: /[a-z]+|%/g
				}]
			},
			{
				match: /url\([^)]*\)/g,
				sub: [{
					type: "func",
					match: /url(?=\()/g
				}, {
					type: "str",
					match: /[^()]+/g
				}]
			},
			{
				type: "func",
				match: /\b[a-zA-Z]\w*(?=\s*\()/g
			},
			{
				type: "num",
				match: /\b[a-z-]+\b/g
			}
		];
	});
	z$1 = {};
	s$1(z$1, { default: () => qt$1 });
	Y$1 = a$1(() => {
		qt$1 = [{ expand: "strDouble" }, {
			type: "oper",
			match: /,/g
		}];
	});
	Z$1 = {};
	s$1(Z$1, { default: () => I$1 });
	N$1 = a$1(() => {
		I$1 = [
			{
				type: "deleted",
				match: /^[-<].*/gm
			},
			{
				type: "insert",
				match: /^[+>].*/gm
			},
			{
				type: "kwd",
				match: /!.*/gm
			},
			{
				type: "section",
				match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm
			}
		];
	});
	X$1 = {};
	s$1(X$1, { default: () => Qt$1 });
	W$1 = a$1(() => {
		f();
		Qt$1 = [{
			type: "kwd",
			match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gim
		}, ...T];
	});
	j$1 = {};
	s$1(j$1, { default: () => Jt$1 });
	K$1 = a$1(() => {
		N$1();
		Jt$1 = [
			{
				match: /^#.*/gm,
				sub: "todo"
			},
			{ expand: "str" },
			...I$1,
			{
				type: "func",
				match: /^(\$ )?git(\s.*)?$/gm
			},
			{
				type: "kwd",
				match: /^commit \w+$/gm
			}
		];
	});
	V$1 = {};
	s$1(V$1, { default: () => te$1 });
	q$1 = a$1(() => {
		te$1 = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*\()/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			},
			{
				type: "oper",
				match: /[+\-*\/%&|^~=!<>.^-]+/g
			}
		];
	});
	J$1 = {};
	s$1(J$1, {
		default: () => A$1,
		name: () => u$1,
		properties: () => l$1,
		xmlElement: () => o
	});
	R$1 = a$1(() => {
		Q$1 = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", ee$1 = Q$1 + "\\-\\.0-9·̀-ͯ‿-⁀", u$1 = `[${Q$1}][${ee$1}]*`, l$1 = `\\s*(\\s+${u$1}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`, o = {
			match: RegExp(`<[/!?]?${u$1}${l$1}[/!?]?>`, "g"),
			sub: [
				{
					type: "var",
					match: RegExp(`^<[/!?]?${u$1}`, "g"),
					sub: [{
						type: "oper",
						match: /^<[\/!?]?/g
					}]
				},
				{
					type: "str",
					match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g,
					sub: [{
						type: "oper",
						match: /^=/g
					}]
				},
				{
					type: "oper",
					match: /[\/!?]?>/g
				},
				{
					type: "class",
					match: RegExp(u$1, "g")
				}
			]
		}, A$1 = [
			{
				match: /<!--[^]*?-->/g,
				sub: "todo"
			},
			{
				type: "class",
				match: /<!\[CDATA\[[\s\S]*?\]\]>/gi
			},
			o,
			{
				type: "str",
				match: RegExp(`<\\?${u$1}([^?]|\\?[^?>])*\\?+>`, "g"),
				sub: [{
					type: "var",
					match: RegExp(`^<\\?${u$1}`, "g"),
					sub: [{
						type: "oper",
						match: /^<\?/g
					}]
				}, {
					type: "oper",
					match: /\?+>$/g
				}]
			},
			{
				type: "var",
				match: /&(#x?)?[\da-z]{1,8};/gi
			}
		];
	});
	tt$1 = {};
	s$1(tt$1, { default: () => ae$1 });
	et$1 = a$1(() => {
		R$1();
		ae$1 = [
			{
				type: "class",
				match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi,
				sub: [
					{
						type: "str",
						match: /"[^"]*"|'[^']*'/g
					},
					{
						type: "oper",
						match: /^<!|>$/g
					},
					{
						type: "var",
						match: /DOCTYPE/gi
					}
				]
			},
			{
				match: RegExp(`<style${l$1}>[^]*?</style\\s*>`, "g"),
				sub: [
					{
						match: RegExp(`^<style${l$1}>`, "g"),
						sub: o.sub
					},
					{
						match: RegExp(`${o.match}|[^]*(?=</style\\s*>$)`, "g"),
						sub: "css"
					},
					o
				]
			},
			{
				match: RegExp(`<script${l$1}>[^]*?<\/script\\s*>`, "g"),
				sub: [
					{
						match: RegExp(`^<script${l$1}>`, "g"),
						sub: o.sub
					},
					{
						match: RegExp(`${o.match}|[^]*(?=<\/script\\s*>$)`, "g"),
						sub: "js"
					},
					o
				]
			},
			...A$1
		];
	});
	d$1 = a$1(() => {
		se$1 = [
			[
				"bash",
				[/#!(\/usr)?\/bin\/bash/g, 500],
				[/\b(if|elif|then|fi|echo)\b|\$/g, 10]
			],
			[
				"html",
				[/<\/?[a-z-]+[^\n>]*>/g, 10],
				[/^\s+<!DOCTYPE\s+html/g, 500]
			],
			["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]],
			["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|document|window)\b/g, 10]],
			["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|document|window|implements|interface|namespace)\b/g, 10]],
			["py", [/\b(def|print|await|async|class|and|or|lambda|import|from|self|asyncio|pass|True|False|None|__init__)\b/g, 10]],
			["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]],
			[
				"pl",
				[/#!(\/usr)?\/bin\/perl/g, 500],
				[/\b(use|print)\b|\$/g, 10]
			],
			["lua", [/#!(\/usr)?\/bin\/lua/g, 500]],
			["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]],
			["uri", [/https?:|mailto:|tel:|ftp:/g, 30]],
			["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
			[
				"diff",
				[/^[+><-]/gm, 10],
				[/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]
			],
			[
				"md",
				[/^(>|\t\*|\t\d+.)/gm, 10],
				[/\[.*\](.*)/g, 10]
			],
			["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]],
			[
				"xml",
				[/<\/?[a-z-]+[^\n>]*>/g, 10],
				[/^<\?xml/g, 500]
			],
			["c", [/#include\b|\bprintf\s+\(/g, 100]],
			["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]],
			["go", [/\b(func|fmt|package)\b/g, 100]],
			["java", [/^import\s+java/gm, 500]],
			["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]],
			["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
			["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]],
			["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gim, 10]]
		], E$1 = (t) => se$1.map(([e, ...p]) => [e, p.reduce((n, [m, c]) => n + [...t.matchAll(m)].length * c, 0)]).filter(([e, p]) => p > 20).sort((e, p) => p[1] - e[1])[0]?.[0] || "plain";
	});
	at$1 = {};
	s$1(at$1, { default: () => pe$1 });
	st$1 = a$1(() => {
		d$1();
		pe$1 = [
			{
				type: "kwd",
				match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm
			},
			{ expand: "str" },
			{
				type: "section",
				match: /\bHTTP\/[\d.]+\b/g
			},
			{ expand: "num" },
			{
				type: "oper",
				match: /[,;:=]/g
			},
			{
				type: "var",
				match: /[a-zA-Z][\w-]*(?=:)/g
			},
			{
				match: /\n\n[^]*/g,
				sub: E$1
			}
		];
	});
	pt$1 = {};
	s$1(pt$1, { default: () => ne$1 });
	nt$1 = a$1(() => {
		ne$1 = [
			{
				match: /(^[ \f\t\v]*)[#;].*/gm,
				sub: "todo"
			},
			{
				type: "var",
				match: /.*(?==)/g
			},
			{
				type: "section",
				match: /^\s*\[.+\]\s*$/gm
			},
			{
				type: "oper",
				match: /=/g
			},
			{
				type: "str",
				match: /.*/g
			}
		];
	});
	ct$1 = {};
	s$1(ct$1, { default: () => ce$1 });
	mt$1 = a$1(() => {
		ce$1 = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*\()/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			}
		];
	});
	rt$1 = {};
	s$1(rt$1, { default: () => O$1 });
	L$1 = a$1(() => {
		O$1 = [
			{ match: /(("|')([^\r\n\\]|\\[^])*?\2|[a-zA-Z]\w*)(?=\s*:)/g },
			{
				match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "jsdoc"
			},
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				match: /`((?!`)[^]|\\[^])*`?/g,
				sub: "js_template_literals"
			},
			{
				type: "kwd",
				match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g
			},
			{
				match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g,
				sub: "regex"
			},
			{ expand: "num" },
			{
				type: "num",
				match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g
			},
			{
				type: "bool",
				match: /\b(true|false)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			},
			{
				type: "func",
				match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g
			}
		];
	});
	ot$1 = {};
	s$1(ot$1, {
		default: () => me$1,
		type: () => re$1
	});
	ut$1 = a$1(() => {
		me$1 = [{
			match: new class {
				exec(t) {
					let e = this.lastIndex, p, n = (m) => {
						for (; ++e < t.length - 2;) if (t[e] == "{") n();
						else if (t[e] == "}") return;
					};
					for (; e < t.length; ++e) if (t[e - 1] != "\\" && t[e] == "$" && t[e + 1] == "{") return p = e++, n(e), this.lastIndex = e + 1, {
						index: p,
						0: t.slice(p, e + 1)
					};
					return null;
				}
			}(),
			sub: [{
				type: "kwd",
				match: /^\${|}$/g
			}, {
				match: /(?!^\$|{)[^]+(?=}$)/g,
				sub: "js"
			}]
		}], re$1 = "str";
	});
	lt$1 = {};
	s$1(lt$1, {
		default: () => x$1,
		type: () => oe$1
	});
	S$1 = a$1(() => {
		x$1 = [
			{
				type: "err",
				match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g
			},
			{
				type: "class",
				match: /\bIDEA\b/g
			},
			{
				type: "insert",
				match: /\b(CHANGED|FIX|CHANGE)\b/g
			},
			{
				type: "oper",
				match: /\bQUESTION\b/g
			}
		], oe$1 = "cmnt";
	});
	Et$1 = {};
	s$1(Et$1, {
		default: () => ue$1,
		type: () => le$1
	});
	ht$1 = a$1(() => {
		S$1();
		ue$1 = [
			{
				type: "kwd",
				match: /@\w+/g
			},
			{
				type: "class",
				match: /{[\w\s|<>,.@\[\]]+}/g
			},
			{
				type: "var",
				match: /\[[\w\s="']+\]/g
			},
			...x$1
		], le$1 = "cmnt";
	});
	it$1 = {};
	s$1(it$1, { default: () => Ee$1 });
	gt$1 = a$1(() => {
		Ee$1 = [
			{
				type: "var",
				match: /(("|')([^\r\n\\]|\\[^])*?\2|[a-zA-Z]\w*)(?=\s*:)/g
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "num",
				match: /\bnull\b/g
			},
			{
				type: "bool",
				match: /\b(true|false)\b/g
			}
		];
	});
	dt$1 = {};
	s$1(dt$1, { default: () => C$1 });
	D$1 = a$1(() => {
		d$1();
		C$1 = [
			{
				type: "cmnt",
				match: /^>.*|(=|-)\1+/gm
			},
			{
				type: "class",
				match: /\*\*.*?\*\*/g
			},
			{
				match: /^(`{3,})(.*)\n[^]*?^\1[ \t]*$/gm,
				sub: (t) => ({
					type: "kwd",
					sub: [{
						match: /\n[^]*(?=```)/g,
						sub: t.split(`
`)[0].slice(3) || E$1(t)
					}]
				})
			},
			{
				type: "str",
				match: /`[^`]*`/g
			},
			{
				type: "var",
				match: /~~.*?~~/g
			},
			{
				type: "kwd",
				match: /\b_\S([^\n]*?\S)?_\b|\*\S([^\n]*?\S)?\*/g
			},
			{
				type: "kwd",
				match: /^\s*(\*|\d+\.)\s/gm
			},
			{
				type: "func",
				match: /\[[^\]]*]\([^)]*\)|<[^>]*>/g,
				sub: [{
					type: "oper",
					match: /^\[[^\]]*]/g
				}]
			}
		];
	});
	bt$1 = {};
	s$1(bt$1, { default: () => he$1 });
	yt$1 = a$1(() => {
		D$1();
		d$1();
		he$1 = [
			{
				type: "insert",
				match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g,
				sub: [{
					type: "insert",
					match: /leanpub-(start|end)-insert/g
				}, {
					match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g,
					sub: E$1
				}]
			},
			{
				type: "deleted",
				match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g,
				sub: [{
					type: "deleted",
					match: /leanpub-(start|end)-delete/g
				}, {
					match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g,
					sub: E$1
				}]
			},
			...C$1
		];
	});
	Tt$1 = {};
	s$1(Tt$1, { default: () => ie$1 });
	ft$1 = a$1(() => {
		ie$1 = [
			{
				type: "cmnt",
				match: /^#.*/gm
			},
			{ expand: "strDouble" },
			{ expand: "num" },
			{
				type: "err",
				match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi
			},
			{
				type: "num",
				match: /\b(null|undefined)\b/gi
			},
			{
				type: "bool",
				match: /\b(false|true|yes|no)\b/gi
			},
			{
				type: "oper",
				match: /\.|,/g
			}
		];
	});
	It$1 = {};
	s$1(It$1, { default: () => ge$1 });
	Nt$1 = a$1(() => {
		ge$1 = [
			{
				match: /^#!.*|--(\[(=*)\[[^]*?--\]\2\]|.*)/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "kwd",
				match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g
			},
			{
				type: "bool",
				match: /\b(true|false|nil)\b/g
			},
			{
				type: "oper",
				match: /[+*/%^#=~<>:,.-]+/g
			},
			{ expand: "num" },
			{
				type: "func",
				match: /[a-z_]+(?=\s*[({])/g
			}
		];
	});
	At$1 = {};
	s$1(At$1, { default: () => de$1 });
	Rt$1 = a$1(() => {
		de$1 = [
			{
				match: /^\s*#.*/gm,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "oper",
				match: /[${}()]+/g
			},
			{
				type: "class",
				match: /.PHONY:/gm
			},
			{
				type: "section",
				match: /^[\w.]+:/gm
			},
			{
				type: "kwd",
				match: /\b(ifneq|endif)\b/g
			},
			{ expand: "num" },
			{
				type: "var",
				match: /[A-Z_]+(?=\s*=)/g
			},
			{
				match: /^.*$/gm,
				sub: "bash"
			}
		];
	});
	Ot$1 = {};
	s$1(Ot$1, { default: () => be$1 });
	Lt$1 = a$1(() => {
		be$1 = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{
				type: "str",
				match: /(["'])(\\[^]|(?!\1)[^])*\1?/g
			},
			{ expand: "num" },
			{
				type: "kwd",
				match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g
			},
			{
				type: "oper",
				match: /[-+*/%~!&<>|=?,]+/g
			},
			{
				type: "func",
				match: /[a-z_]+(?=\s*\()/g
			}
		];
	});
	xt$1 = {};
	s$1(xt$1, { default: () => ye$1 });
	St$1 = a$1(() => {
		ye$1 = [{ expand: "strDouble" }];
	});
	Ct$1 = {};
	s$1(Ct$1, { default: () => Te$1 });
	Dt$1 = a$1(() => {
		Te$1 = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{
				type: "str",
				match: /f("""|''')(\\[^]|(?!\1)[^])*\1?|f("|')(\\[^]|(?!\3).)*\3?/gi,
				sub: [{
					type: "var",
					match: /{[^{}]*}/g,
					sub: [{
						match: /(?!^{)[^]*(?=}$)/g,
						sub: "py"
					}]
				}]
			},
			{
				match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "kwd",
				match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g
			},
			{
				type: "bool",
				match: /\b(False|True|None)\b/g
			},
			{ expand: "num" },
			{
				type: "func",
				match: /[a-z_]\w*(?=\s*\()/gi
			},
			{
				type: "oper",
				match: /[-/*+<>,=!&|^%]+/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			}
		];
	});
	wt$1 = {};
	s$1(wt$1, {
		default: () => fe$1,
		type: () => Ie$1
	});
	Ut$1 = a$1(() => {
		fe$1 = [
			{
				match: /^(?!\/).*/gm,
				sub: "todo"
			},
			{
				type: "num",
				match: /\[((?!\])[^\\]|\\.)*\]/g
			},
			{
				type: "kwd",
				match: /\||\^|\$|\\.|\w+($|\r|\n)/g
			},
			{
				type: "var",
				match: /\*|\+|\{\d+,\d+\}/g
			}
		], Ie$1 = "oper";
	});
	Pt$1 = {};
	s$1(Pt$1, { default: () => Ne$1 });
	Ft$1 = a$1(() => {
		Ne$1 = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g
			}
		];
	});
	Mt$1 = {};
	s$1(Mt$1, { default: () => Ae$1 });
	$t$1 = a$1(() => {
		Ae$1 = [
			{
				match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "func",
				match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g
			},
			{
				type: "kwd",
				match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g
			},
			{
				type: "num",
				match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g
			},
			{
				type: "bool",
				match: /\b(TRUE|FALSE)\b/g
			},
			{
				type: "oper",
				match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g
			},
			{
				type: "var",
				match: /@\S+/g
			}
		];
	});
	vt$1 = {};
	s$1(vt$1, { default: () => Re$1 });
	Bt$1 = a$1(() => {
		Re$1 = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{
				type: "str",
				match: /("""|''')((?!\1)[^]|\\[^])*\1?/g
			},
			{ expand: "str" },
			{
				type: "section",
				match: /^\[.+\]\s*$/gm
			},
			{
				type: "num",
				match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g
			},
			{ expand: "num" },
			{
				type: "bool",
				match: /\b(true|false)\b/g
			},
			{
				type: "oper",
				match: /[+,.=-]/g
			},
			{
				type: "var",
				match: /\w+(?= \=)/g
			}
		];
	});
	Gt$1 = {};
	s$1(Gt$1, { default: () => Oe$1 });
	Ht$1 = a$1(() => {
		L$1();
		Oe$1 = [
			{
				type: "type",
				match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g
			},
			{
				type: "kwd",
				match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g
			},
			...O$1
		];
	});
	_t$1 = {};
	s$1(_t$1, { default: () => Le$1 });
	kt$1 = a$1(() => {
		Le$1 = [
			{
				match: /^#.*/gm,
				sub: "todo"
			},
			{
				type: "class",
				match: /^\w+(?=:?)/gm
			},
			{
				type: "num",
				match: /:\d+/g
			},
			{
				type: "oper",
				match: /[:/&?]|\w+=/g
			},
			{
				type: "func",
				match: /[.\w]+@|#[\w]+$/gm
			},
			{
				type: "var",
				match: /\w+\.\w+(\.\w+)*/g
			}
		];
	});
	zt$1 = {};
	s$1(zt$1, { default: () => xe$1 });
	Yt$1 = a$1(() => {
		xe$1 = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "str",
				match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g
			},
			{
				type: "type",
				match: /!![a-z]+/g
			},
			{
				type: "bool",
				match: /\b(Yes|No)\b/g
			},
			{
				type: "oper",
				match: /[+:-]/g
			},
			{ expand: "num" },
			{
				type: "var",
				match: /[a-zA-Z]\w*(?=:)/g
			}
		];
	});
	U$1 = {
		num: {
			type: "num",
			match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g
		},
		str: {
			type: "str",
			match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g
		},
		strDouble: {
			type: "str",
			match: /"((?!")[^\r\n\\]|\\[^])*"?/g
		}
	};
	Se$1 = w$1({
		"./languages/asm.js": () => Promise.resolve().then(() => (F$1(), P$1)),
		"./languages/bash.js": () => Promise.resolve().then(() => (f(), $$1)),
		"./languages/bf.js": () => Promise.resolve().then(() => (B$1(), v$1)),
		"./languages/c.js": () => Promise.resolve().then(() => (H$1(), G$1)),
		"./languages/css.js": () => Promise.resolve().then(() => (k$1(), _$1)),
		"./languages/csv.js": () => Promise.resolve().then(() => (Y$1(), z$1)),
		"./languages/diff.js": () => Promise.resolve().then(() => (N$1(), Z$1)),
		"./languages/docker.js": () => Promise.resolve().then(() => (W$1(), X$1)),
		"./languages/git.js": () => Promise.resolve().then(() => (K$1(), j$1)),
		"./languages/go.js": () => Promise.resolve().then(() => (q$1(), V$1)),
		"./languages/html.js": () => Promise.resolve().then(() => (et$1(), tt$1)),
		"./languages/http.js": () => Promise.resolve().then(() => (st$1(), at$1)),
		"./languages/ini.js": () => Promise.resolve().then(() => (nt$1(), pt$1)),
		"./languages/java.js": () => Promise.resolve().then(() => (mt$1(), ct$1)),
		"./languages/js.js": () => Promise.resolve().then(() => (L$1(), rt$1)),
		"./languages/js_template_literals.js": () => Promise.resolve().then(() => (ut$1(), ot$1)),
		"./languages/jsdoc.js": () => Promise.resolve().then(() => (ht$1(), Et$1)),
		"./languages/json.js": () => Promise.resolve().then(() => (gt$1(), it$1)),
		"./languages/leanpub-md.js": () => Promise.resolve().then(() => (yt$1(), bt$1)),
		"./languages/log.js": () => Promise.resolve().then(() => (ft$1(), Tt$1)),
		"./languages/lua.js": () => Promise.resolve().then(() => (Nt$1(), It$1)),
		"./languages/make.js": () => Promise.resolve().then(() => (Rt$1(), At$1)),
		"./languages/md.js": () => Promise.resolve().then(() => (D$1(), dt$1)),
		"./languages/pl.js": () => Promise.resolve().then(() => (Lt$1(), Ot$1)),
		"./languages/plain.js": () => Promise.resolve().then(() => (St$1(), xt$1)),
		"./languages/py.js": () => Promise.resolve().then(() => (Dt$1(), Ct$1)),
		"./languages/regex.js": () => Promise.resolve().then(() => (Ut$1(), wt$1)),
		"./languages/rs.js": () => Promise.resolve().then(() => (Ft$1(), Pt$1)),
		"./languages/sql.js": () => Promise.resolve().then(() => ($t$1(), Mt$1)),
		"./languages/todo.js": () => Promise.resolve().then(() => (S$1(), lt$1)),
		"./languages/toml.js": () => Promise.resolve().then(() => (Bt$1(), vt$1)),
		"./languages/ts.js": () => Promise.resolve().then(() => (Ht$1(), Gt$1)),
		"./languages/uri.js": () => Promise.resolve().then(() => (kt$1(), _t$1)),
		"./languages/xml.js": () => Promise.resolve().then(() => (R$1(), J$1)),
		"./languages/yaml.js": () => Promise.resolve().then(() => (Yt$1(), zt$1))
	});
	b$1 = {}, Ce$1 = (t = "") => t.replaceAll("&", "&#38;").replaceAll?.("<", "&lt;").replaceAll?.(">", "&gt;"), De$1 = (t, e) => e ? `<span class="shj-syn-${e}">${t}</span>` : t;
}));
//#endregion
//#region node_modules/@speed-highlight/core/dist/terminal.js
async function F(n, t, p) {
	try {
		let r, m, c = {}, T, o = [], h = 0, f = typeof t == "string" ? await (P[t] ?? (P[t] = $e(`./languages/${t}.js`))) : t, g = [...typeof t == "string" ? f.default : t.sub];
		for (; h < n.length;) {
			for (c.index = null, r = g.length; r-- > 0;) {
				if (m = g[r].expand ? v[g[r].expand] : g[r], o[r] === void 0 || o[r].match.index < h) {
					if (m.match.lastIndex = h, T = m.match.exec(n), T === null) {
						g.splice(r, 1), o.splice(r, 1);
						continue;
					}
					o[r] = {
						match: T,
						lastIndex: m.match.lastIndex
					};
				}
				o[r].match[0] && (o[r].match.index <= c.index || c.index === null) && (c = {
					part: m,
					index: o[r].match.index,
					match: o[r].match[0],
					end: o[r].lastIndex
				});
			}
			if (c.index === null) break;
			p(n.slice(h, c.index), f.type), h = c.end, c.part.sub ? await F(c.match, typeof c.part.sub == "string" ? c.part.sub : typeof c.part.sub == "function" ? c.part.sub(c.match) : c.part, p) : p(c.match, c.part.type);
		}
		p(n.slice(h, n.length), f.type);
	} catch {
		p(n);
	}
}
var te, d, e, a, B, ee, G, H, k, I, N, _, ae, z, Y, ne, Z, X, se, W, j, pe, K, V, A, R, q, re, Q, J, ce, tt, et, me, at, st, nt, oe, u, i, l, O, x, pt, le, rt, ue, E, b, ct, ie, mt, ot, Ee, lt, ut, he, it, Et, L, S, ht, ge, de, gt, dt, C, be, w, bt, ye, Te, yt, Tt, fe, ft, It, D, U, Nt, Ie, At, Rt, Ne, Ot, xt, Ae, Lt, St, Re, Ct, wt, Oe, Dt, Ut, xe, Pt, Ft, Le, Mt, $t, Se, Ce, vt, Bt, we, Gt, kt, De, Ht, _t, Ue, zt, Yt, Pe, Zt, Xt, Fe, Wt, jt, Me, Kt, Vt, s, y, qt, ve, Qt, M, Be, $, v, $e, P, Jt, ke;
var init_terminal = __esmMin((() => {
	te = Object.defineProperty;
	d = (n) => (t) => {
		var p = n[t];
		if (p) return p();
		throw new Error("Module not found in bundle: " + t);
	};
	e = (n, t) => () => (n && (t = n(n = 0)), t);
	a = (n, t) => {
		for (var p in t) te(n, p, {
			get: t[p],
			enumerable: !0
		});
	};
	B = {};
	a(B, { default: () => ee });
	G = e(() => {
		ee = [
			{
				type: "cmnt",
				match: /(;|#).*/gm
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "num",
				match: /\$[\da-fA-F]*\b/g
			},
			{
				type: "kwd",
				match: /^[a-z]+\s+[a-z.]+\b/gm,
				sub: [{
					type: "func",
					match: /^[a-z]+/g
				}]
			},
			{
				type: "kwd",
				match: /^\t*[a-z][a-z\d]*\b/gm
			},
			{
				match: /%|\$/g,
				type: "oper"
			}
		];
	});
	H = {};
	a(H, { default: () => I });
	N = e(() => {
		k = {
			type: "var",
			match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g
		}, I = [
			{
				sub: "todo",
				match: /#.*/g
			},
			{
				type: "str",
				match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,
				sub: [k]
			},
			{
				type: "oper",
				match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi
			},
			{
				type: "kwd",
				match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g
			},
			{ expand: "num" },
			{
				type: "func",
				match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gim
			},
			{
				type: "bool",
				match: /(?<=\s|^)(true|false)(?=\s|$)/g
			},
			{
				type: "oper",
				match: /[=(){}<>!]+/g
			},
			{
				type: "var",
				match: /(?<=\s|^)[\w_]+(?=\s*=)/g
			},
			k
		];
	});
	_ = {};
	a(_, { default: () => ae });
	z = e(() => {
		ae = [
			{
				match: /[^\[\->+.<\]\s].*/g,
				sub: "todo"
			},
			{
				type: "func",
				match: /\.+/g
			},
			{
				type: "kwd",
				match: /[<>]+/g
			},
			{
				type: "oper",
				match: /[+-]+/g
			}
		];
	});
	Y = {};
	a(Y, { default: () => ne });
	Z = e(() => {
		ne = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /#\s*include (<.*>|".*")/g,
				sub: [{
					type: "str",
					match: /(<|").*/g
				}]
			},
			{
				match: /asm\s*{[^}]*}/g,
				sub: [{
					type: "kwd",
					match: /^asm/g
				}, {
					match: /[^{}]*(?=}$)/g,
					sub: "asm"
				}]
			},
			{
				type: "kwd",
				match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*\()/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			}
		];
	});
	X = {};
	a(X, { default: () => se });
	W = e(() => {
		se = [
			{
				match: /\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "kwd",
				match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g
			},
			{
				type: "var",
				match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g
			},
			{
				type: "func",
				match: /#[\w-]+(?=[^{}]*{)/g
			},
			{
				type: "num",
				match: /#[\da-f]{3,8}/g
			},
			{
				type: "num",
				match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g,
				sub: [{
					type: "var",
					match: /[a-z]+|%/g
				}]
			},
			{
				match: /url\([^)]*\)/g,
				sub: [{
					type: "func",
					match: /url(?=\()/g
				}, {
					type: "str",
					match: /[^()]+/g
				}]
			},
			{
				type: "func",
				match: /\b[a-zA-Z]\w*(?=\s*\()/g
			},
			{
				type: "num",
				match: /\b[a-z-]+\b/g
			}
		];
	});
	j = {};
	a(j, { default: () => pe });
	K = e(() => {
		pe = [{ expand: "strDouble" }, {
			type: "oper",
			match: /,/g
		}];
	});
	V = {};
	a(V, { default: () => A });
	R = e(() => {
		A = [
			{
				type: "deleted",
				match: /^[-<].*/gm
			},
			{
				type: "insert",
				match: /^[+>].*/gm
			},
			{
				type: "kwd",
				match: /!.*/gm
			},
			{
				type: "section",
				match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm
			}
		];
	});
	q = {};
	a(q, { default: () => re });
	Q = e(() => {
		N();
		re = [{
			type: "kwd",
			match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gim
		}, ...I];
	});
	J = {};
	a(J, { default: () => ce });
	tt = e(() => {
		R();
		ce = [
			{
				match: /^#.*/gm,
				sub: "todo"
			},
			{ expand: "str" },
			...A,
			{
				type: "func",
				match: /^(\$ )?git(\s.*)?$/gm
			},
			{
				type: "kwd",
				match: /^commit \w+$/gm
			}
		];
	});
	et = {};
	a(et, { default: () => me });
	at = e(() => {
		me = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*\()/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			},
			{
				type: "oper",
				match: /[+\-*\/%&|^~=!<>.^-]+/g
			}
		];
	});
	st = {};
	a(st, {
		default: () => O,
		name: () => u,
		properties: () => i,
		xmlElement: () => l
	});
	x = e(() => {
		nt = ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", oe = nt + "\\-\\.0-9·̀-ͯ‿-⁀", u = `[${nt}][${oe}]*`, i = `\\s*(\\s+${u}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`, l = {
			match: RegExp(`<[/!?]?${u}${i}[/!?]?>`, "g"),
			sub: [
				{
					type: "var",
					match: RegExp(`^<[/!?]?${u}`, "g"),
					sub: [{
						type: "oper",
						match: /^<[\/!?]?/g
					}]
				},
				{
					type: "str",
					match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g,
					sub: [{
						type: "oper",
						match: /^=/g
					}]
				},
				{
					type: "oper",
					match: /[\/!?]?>/g
				},
				{
					type: "class",
					match: RegExp(u, "g")
				}
			]
		}, O = [
			{
				match: /<!--[^]*?-->/g,
				sub: "todo"
			},
			{
				type: "class",
				match: /<!\[CDATA\[[\s\S]*?\]\]>/gi
			},
			l,
			{
				type: "str",
				match: RegExp(`<\\?${u}([^?]|\\?[^?>])*\\?+>`, "g"),
				sub: [{
					type: "var",
					match: RegExp(`^<\\?${u}`, "g"),
					sub: [{
						type: "oper",
						match: /^<\?/g
					}]
				}, {
					type: "oper",
					match: /\?+>$/g
				}]
			},
			{
				type: "var",
				match: /&(#x?)?[\da-z]{1,8};/gi
			}
		];
	});
	pt = {};
	a(pt, { default: () => le });
	rt = e(() => {
		x();
		le = [
			{
				type: "class",
				match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi,
				sub: [
					{
						type: "str",
						match: /"[^"]*"|'[^']*'/g
					},
					{
						type: "oper",
						match: /^<!|>$/g
					},
					{
						type: "var",
						match: /DOCTYPE/gi
					}
				]
			},
			{
				match: RegExp(`<style${i}>[^]*?</style\\s*>`, "g"),
				sub: [
					{
						match: RegExp(`^<style${i}>`, "g"),
						sub: l.sub
					},
					{
						match: RegExp(`${l.match}|[^]*(?=</style\\s*>$)`, "g"),
						sub: "css"
					},
					l
				]
			},
			{
				match: RegExp(`<script${i}>[^]*?<\/script\\s*>`, "g"),
				sub: [
					{
						match: RegExp(`^<script${i}>`, "g"),
						sub: l.sub
					},
					{
						match: RegExp(`${l.match}|[^]*(?=<\/script\\s*>$)`, "g"),
						sub: "js"
					},
					l
				]
			},
			...O
		];
	});
	b = e(() => {
		ue = [
			[
				"bash",
				[/#!(\/usr)?\/bin\/bash/g, 500],
				[/\b(if|elif|then|fi|echo)\b|\$/g, 10]
			],
			[
				"html",
				[/<\/?[a-z-]+[^\n>]*>/g, 10],
				[/^\s+<!DOCTYPE\s+html/g, 500]
			],
			["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]],
			["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|document|window)\b/g, 10]],
			["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|document|window|implements|interface|namespace)\b/g, 10]],
			["py", [/\b(def|print|await|async|class|and|or|lambda|import|from|self|asyncio|pass|True|False|None|__init__)\b/g, 10]],
			["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]],
			[
				"pl",
				[/#!(\/usr)?\/bin\/perl/g, 500],
				[/\b(use|print)\b|\$/g, 10]
			],
			["lua", [/#!(\/usr)?\/bin\/lua/g, 500]],
			["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]],
			["uri", [/https?:|mailto:|tel:|ftp:/g, 30]],
			["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
			[
				"diff",
				[/^[+><-]/gm, 10],
				[/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]
			],
			[
				"md",
				[/^(>|\t\*|\t\d+.)/gm, 10],
				[/\[.*\](.*)/g, 10]
			],
			["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]],
			[
				"xml",
				[/<\/?[a-z-]+[^\n>]*>/g, 10],
				[/^<\?xml/g, 500]
			],
			["c", [/#include\b|\bprintf\s+\(/g, 100]],
			["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]],
			["go", [/\b(func|fmt|package)\b/g, 100]],
			["java", [/^import\s+java/gm, 500]],
			["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]],
			["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
			["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]],
			["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gim, 10]]
		], E = (n) => ue.map(([t, ...p]) => [t, p.reduce((r, [m, c]) => r + [...n.matchAll(m)].length * c, 0)]).filter(([t, p]) => p > 20).sort((t, p) => p[1] - t[1])[0]?.[0] || "plain";
	});
	ct = {};
	a(ct, { default: () => ie });
	mt = e(() => {
		b();
		ie = [
			{
				type: "kwd",
				match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm
			},
			{ expand: "str" },
			{
				type: "section",
				match: /\bHTTP\/[\d.]+\b/g
			},
			{ expand: "num" },
			{
				type: "oper",
				match: /[,;:=]/g
			},
			{
				type: "var",
				match: /[a-zA-Z][\w-]*(?=:)/g
			},
			{
				match: /\n\n[^]*/g,
				sub: E
			}
		];
	});
	ot = {};
	a(ot, { default: () => Ee });
	lt = e(() => {
		Ee = [
			{
				match: /(^[ \f\t\v]*)[#;].*/gm,
				sub: "todo"
			},
			{
				type: "var",
				match: /.*(?==)/g
			},
			{
				type: "section",
				match: /^\s*\[.+\]\s*$/gm
			},
			{
				type: "oper",
				match: /=/g
			},
			{
				type: "str",
				match: /.*/g
			}
		];
	});
	ut = {};
	a(ut, { default: () => he });
	it = e(() => {
		he = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*\()/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			}
		];
	});
	Et = {};
	a(Et, { default: () => L });
	S = e(() => {
		L = [
			{ match: /(("|')([^\r\n\\]|\\[^])*?\2|[a-zA-Z]\w*)(?=\s*:)/g },
			{
				match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "jsdoc"
			},
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				match: /`((?!`)[^]|\\[^])*`?/g,
				sub: "js_template_literals"
			},
			{
				type: "kwd",
				match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g
			},
			{
				match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g,
				sub: "regex"
			},
			{ expand: "num" },
			{
				type: "num",
				match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g
			},
			{
				type: "bool",
				match: /\b(true|false)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			},
			{
				type: "func",
				match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g
			}
		];
	});
	ht = {};
	a(ht, {
		default: () => ge,
		type: () => de
	});
	gt = e(() => {
		ge = [{
			match: new class {
				exec(n) {
					let t = this.lastIndex, p, r = (m) => {
						for (; ++t < n.length - 2;) if (n[t] == "{") r();
						else if (n[t] == "}") return;
					};
					for (; t < n.length; ++t) if (n[t - 1] != "\\" && n[t] == "$" && n[t + 1] == "{") return p = t++, r(t), this.lastIndex = t + 1, {
						index: p,
						0: n.slice(p, t + 1)
					};
					return null;
				}
			}(),
			sub: [{
				type: "kwd",
				match: /^\${|}$/g
			}, {
				match: /(?!^\$|{)[^]+(?=}$)/g,
				sub: "js"
			}]
		}], de = "str";
	});
	dt = {};
	a(dt, {
		default: () => C,
		type: () => be
	});
	w = e(() => {
		C = [
			{
				type: "err",
				match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g
			},
			{
				type: "class",
				match: /\bIDEA\b/g
			},
			{
				type: "insert",
				match: /\b(CHANGED|FIX|CHANGE)\b/g
			},
			{
				type: "oper",
				match: /\bQUESTION\b/g
			}
		], be = "cmnt";
	});
	bt = {};
	a(bt, {
		default: () => ye,
		type: () => Te
	});
	yt = e(() => {
		w();
		ye = [
			{
				type: "kwd",
				match: /@\w+/g
			},
			{
				type: "class",
				match: /{[\w\s|<>,.@\[\]]+}/g
			},
			{
				type: "var",
				match: /\[[\w\s="']+\]/g
			},
			...C
		], Te = "cmnt";
	});
	Tt = {};
	a(Tt, { default: () => fe });
	ft = e(() => {
		fe = [
			{
				type: "var",
				match: /(("|')([^\r\n\\]|\\[^])*?\2|[a-zA-Z]\w*)(?=\s*:)/g
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "num",
				match: /\bnull\b/g
			},
			{
				type: "bool",
				match: /\b(true|false)\b/g
			}
		];
	});
	It = {};
	a(It, { default: () => D });
	U = e(() => {
		b();
		D = [
			{
				type: "cmnt",
				match: /^>.*|(=|-)\1+/gm
			},
			{
				type: "class",
				match: /\*\*.*?\*\*/g
			},
			{
				match: /^(`{3,})(.*)\n[^]*?^\1[ \t]*$/gm,
				sub: (n) => ({
					type: "kwd",
					sub: [{
						match: /\n[^]*(?=```)/g,
						sub: n.split(`
`)[0].slice(3) || E(n)
					}]
				})
			},
			{
				type: "str",
				match: /`[^`]*`/g
			},
			{
				type: "var",
				match: /~~.*?~~/g
			},
			{
				type: "kwd",
				match: /\b_\S([^\n]*?\S)?_\b|\*\S([^\n]*?\S)?\*/g
			},
			{
				type: "kwd",
				match: /^\s*(\*|\d+\.)\s/gm
			},
			{
				type: "func",
				match: /\[[^\]]*]\([^)]*\)|<[^>]*>/g,
				sub: [{
					type: "oper",
					match: /^\[[^\]]*]/g
				}]
			}
		];
	});
	Nt = {};
	a(Nt, { default: () => Ie });
	At = e(() => {
		U();
		b();
		Ie = [
			{
				type: "insert",
				match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g,
				sub: [{
					type: "insert",
					match: /leanpub-(start|end)-insert/g
				}, {
					match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g,
					sub: E
				}]
			},
			{
				type: "deleted",
				match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g,
				sub: [{
					type: "deleted",
					match: /leanpub-(start|end)-delete/g
				}, {
					match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g,
					sub: E
				}]
			},
			...D
		];
	});
	Rt = {};
	a(Rt, { default: () => Ne });
	Ot = e(() => {
		Ne = [
			{
				type: "cmnt",
				match: /^#.*/gm
			},
			{ expand: "strDouble" },
			{ expand: "num" },
			{
				type: "err",
				match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi
			},
			{
				type: "num",
				match: /\b(null|undefined)\b/gi
			},
			{
				type: "bool",
				match: /\b(false|true|yes|no)\b/gi
			},
			{
				type: "oper",
				match: /\.|,/g
			}
		];
	});
	xt = {};
	a(xt, { default: () => Ae });
	Lt = e(() => {
		Ae = [
			{
				match: /^#!.*|--(\[(=*)\[[^]*?--\]\2\]|.*)/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "kwd",
				match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g
			},
			{
				type: "bool",
				match: /\b(true|false|nil)\b/g
			},
			{
				type: "oper",
				match: /[+*/%^#=~<>:,.-]+/g
			},
			{ expand: "num" },
			{
				type: "func",
				match: /[a-z_]+(?=\s*[({])/g
			}
		];
	});
	St = {};
	a(St, { default: () => Re });
	Ct = e(() => {
		Re = [
			{
				match: /^\s*#.*/gm,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "oper",
				match: /[${}()]+/g
			},
			{
				type: "class",
				match: /.PHONY:/gm
			},
			{
				type: "section",
				match: /^[\w.]+:/gm
			},
			{
				type: "kwd",
				match: /\b(ifneq|endif)\b/g
			},
			{ expand: "num" },
			{
				type: "var",
				match: /[A-Z_]+(?=\s*=)/g
			},
			{
				match: /^.*$/gm,
				sub: "bash"
			}
		];
	});
	wt = {};
	a(wt, { default: () => Oe });
	Dt = e(() => {
		Oe = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{
				type: "str",
				match: /(["'])(\\[^]|(?!\1)[^])*\1?/g
			},
			{ expand: "num" },
			{
				type: "kwd",
				match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g
			},
			{
				type: "oper",
				match: /[-+*/%~!&<>|=?,]+/g
			},
			{
				type: "func",
				match: /[a-z_]+(?=\s*\()/g
			}
		];
	});
	Ut = {};
	a(Ut, { default: () => xe });
	Pt = e(() => {
		xe = [{ expand: "strDouble" }];
	});
	Ft = {};
	a(Ft, { default: () => Le });
	Mt = e(() => {
		Le = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{
				type: "str",
				match: /f("""|''')(\\[^]|(?!\1)[^])*\1?|f("|')(\\[^]|(?!\3).)*\3?/gi,
				sub: [{
					type: "var",
					match: /{[^{}]*}/g,
					sub: [{
						match: /(?!^{)[^]*(?=}$)/g,
						sub: "py"
					}]
				}]
			},
			{
				match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "kwd",
				match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g
			},
			{
				type: "bool",
				match: /\b(False|True|None)\b/g
			},
			{ expand: "num" },
			{
				type: "func",
				match: /[a-z_]\w*(?=\s*\()/gi
			},
			{
				type: "oper",
				match: /[-/*+<>,=!&|^%]+/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			}
		];
	});
	$t = {};
	a($t, {
		default: () => Se,
		type: () => Ce
	});
	vt = e(() => {
		Se = [
			{
				match: /^(?!\/).*/gm,
				sub: "todo"
			},
			{
				type: "num",
				match: /\[((?!\])[^\\]|\\.)*\]/g
			},
			{
				type: "kwd",
				match: /\||\^|\$|\\.|\w+($|\r|\n)/g
			},
			{
				type: "var",
				match: /\*|\+|\{\d+,\d+\}/g
			}
		], Ce = "oper";
	});
	Bt = {};
	a(Bt, { default: () => we });
	Gt = e(() => {
		we = [
			{
				match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{ expand: "num" },
			{
				type: "kwd",
				match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g
			},
			{
				type: "oper",
				match: /[/*+:?&|%^~=!,<>.^-]+/g
			},
			{
				type: "class",
				match: /\b[A-Z][\w_]*\b/g
			},
			{
				type: "func",
				match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g
			}
		];
	});
	kt = {};
	a(kt, { default: () => De });
	Ht = e(() => {
		De = [
			{
				match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "func",
				match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g
			},
			{
				type: "kwd",
				match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g
			},
			{
				type: "num",
				match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g
			},
			{
				type: "bool",
				match: /\b(TRUE|FALSE)\b/g
			},
			{
				type: "oper",
				match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g
			},
			{
				type: "var",
				match: /@\S+/g
			}
		];
	});
	_t = {};
	a(_t, { default: () => Ue });
	zt = e(() => {
		Ue = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{
				type: "str",
				match: /("""|''')((?!\1)[^]|\\[^])*\1?/g
			},
			{ expand: "str" },
			{
				type: "section",
				match: /^\[.+\]\s*$/gm
			},
			{
				type: "num",
				match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g
			},
			{ expand: "num" },
			{
				type: "bool",
				match: /\b(true|false)\b/g
			},
			{
				type: "oper",
				match: /[+,.=-]/g
			},
			{
				type: "var",
				match: /\w+(?= \=)/g
			}
		];
	});
	Yt = {};
	a(Yt, { default: () => Pe });
	Zt = e(() => {
		S();
		Pe = [
			{
				type: "type",
				match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g
			},
			{
				type: "kwd",
				match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g
			},
			...L
		];
	});
	Xt = {};
	a(Xt, { default: () => Fe });
	Wt = e(() => {
		Fe = [
			{
				match: /^#.*/gm,
				sub: "todo"
			},
			{
				type: "class",
				match: /^\w+(?=:?)/gm
			},
			{
				type: "num",
				match: /:\d+/g
			},
			{
				type: "oper",
				match: /[:/&?]|\w+=/g
			},
			{
				type: "func",
				match: /[.\w]+@|#[\w]+$/gm
			},
			{
				type: "var",
				match: /\w+\.\w+(\.\w+)*/g
			}
		];
	});
	jt = {};
	a(jt, { default: () => Me });
	Kt = e(() => {
		Me = [
			{
				match: /#.*/g,
				sub: "todo"
			},
			{ expand: "str" },
			{
				type: "str",
				match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g
			},
			{
				type: "type",
				match: /!![a-z]+/g
			},
			{
				type: "bool",
				match: /\b(Yes|No)\b/g
			},
			{
				type: "oper",
				match: /[+:-]/g
			},
			{ expand: "num" },
			{
				type: "var",
				match: /[a-zA-Z]\w*(?=:)/g
			}
		];
	});
	Vt = {};
	a(Vt, { default: () => s });
	y = e(() => {
		s = {
			black: "\x1B[30m",
			red: "\x1B[31m",
			green: "\x1B[32m",
			gray: "\x1B[90m",
			yellow: "\x1B[33m",
			blue: "\x1B[34m",
			magenta: "\x1B[35m",
			cyan: "\x1B[36m",
			white: "\x1B[37m"
		};
	});
	qt = {};
	a(qt, { default: () => ve });
	Qt = e(() => {
		y();
		ve = {
			deleted: s.red,
			var: s.red,
			err: s.red,
			kwd: s.magenta,
			num: s.yellow,
			class: s.yellow,
			cmnt: s.gray,
			insert: s.green,
			str: s.green,
			bool: s.cyan,
			type: s.blue,
			oper: s.blue,
			section: s.magenta,
			func: s.blue
		};
	});
	M = {};
	a(M, { default: () => Be });
	$ = e(() => {
		y();
		Be = {
			deleted: s.red,
			var: s.red,
			err: s.red,
			kwd: s.red,
			num: s.yellow,
			class: s.yellow,
			cmnt: s.gray,
			insert: s.green,
			str: s.green,
			bool: s.cyan,
			type: s.blue,
			oper: s.blue,
			section: s.magenta,
			func: s.magenta
		};
	});
	v = {
		num: {
			type: "num",
			match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g
		},
		str: {
			type: "str",
			match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g
		},
		strDouble: {
			type: "str",
			match: /"((?!")[^\r\n\\]|\\[^])*"?/g
		}
	};
	$e = d({
		"./languages/asm.js": () => Promise.resolve().then(() => (G(), B)),
		"./languages/bash.js": () => Promise.resolve().then(() => (N(), H)),
		"./languages/bf.js": () => Promise.resolve().then(() => (z(), _)),
		"./languages/c.js": () => Promise.resolve().then(() => (Z(), Y)),
		"./languages/css.js": () => Promise.resolve().then(() => (W(), X)),
		"./languages/csv.js": () => Promise.resolve().then(() => (K(), j)),
		"./languages/diff.js": () => Promise.resolve().then(() => (R(), V)),
		"./languages/docker.js": () => Promise.resolve().then(() => (Q(), q)),
		"./languages/git.js": () => Promise.resolve().then(() => (tt(), J)),
		"./languages/go.js": () => Promise.resolve().then(() => (at(), et)),
		"./languages/html.js": () => Promise.resolve().then(() => (rt(), pt)),
		"./languages/http.js": () => Promise.resolve().then(() => (mt(), ct)),
		"./languages/ini.js": () => Promise.resolve().then(() => (lt(), ot)),
		"./languages/java.js": () => Promise.resolve().then(() => (it(), ut)),
		"./languages/js.js": () => Promise.resolve().then(() => (S(), Et)),
		"./languages/js_template_literals.js": () => Promise.resolve().then(() => (gt(), ht)),
		"./languages/jsdoc.js": () => Promise.resolve().then(() => (yt(), bt)),
		"./languages/json.js": () => Promise.resolve().then(() => (ft(), Tt)),
		"./languages/leanpub-md.js": () => Promise.resolve().then(() => (At(), Nt)),
		"./languages/log.js": () => Promise.resolve().then(() => (Ot(), Rt)),
		"./languages/lua.js": () => Promise.resolve().then(() => (Lt(), xt)),
		"./languages/make.js": () => Promise.resolve().then(() => (Ct(), St)),
		"./languages/md.js": () => Promise.resolve().then(() => (U(), It)),
		"./languages/pl.js": () => Promise.resolve().then(() => (Dt(), wt)),
		"./languages/plain.js": () => Promise.resolve().then(() => (Pt(), Ut)),
		"./languages/py.js": () => Promise.resolve().then(() => (Mt(), Ft)),
		"./languages/regex.js": () => Promise.resolve().then(() => (vt(), $t)),
		"./languages/rs.js": () => Promise.resolve().then(() => (Gt(), Bt)),
		"./languages/sql.js": () => Promise.resolve().then(() => (Ht(), kt)),
		"./languages/todo.js": () => Promise.resolve().then(() => (w(), dt)),
		"./languages/toml.js": () => Promise.resolve().then(() => (zt(), _t)),
		"./languages/ts.js": () => Promise.resolve().then(() => (Zt(), Yt)),
		"./languages/uri.js": () => Promise.resolve().then(() => (Wt(), Xt)),
		"./languages/xml.js": () => Promise.resolve().then(() => (x(), st)),
		"./languages/yaml.js": () => Promise.resolve().then(() => (Kt(), jt))
	});
	P = {};
	d({
		"./themes/atom-dark.js": () => Promise.resolve().then(() => (Qt(), qt)),
		"./themes/default.js": () => Promise.resolve().then(() => ($(), M)),
		"./themes/termcolor.js": () => Promise.resolve().then(() => (y(), Vt))
	});
	Jt = Promise.resolve().then(() => ($(), M)), ke = async (n, t) => {
		let p = "", r = (await Jt).default;
		return await F(n, t, (m, c) => p += c ? `${r[c] ?? ""}${m}\x1B[0m` : m), p;
	};
}));
//#endregion
export { we$1 as i, ke as n, init_dist as r, init_terminal as t };
