import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { n as listMoodEntries } from "./mood.functions-1ScI9ZIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-DnUNF_ny.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatDate(iso) {
	return new Date(iso).toLocaleDateString(void 0, {
		month: "long",
		day: "numeric"
	});
}
function History() {
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const list = useServerFn(listMoodEntries);
	(0, import_react.useEffect)(() => {
		list().then(setEntries).finally(() => setLoading(false));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-diary-gradient px-5 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-md mx-auto w-full flex items-center justify-between mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm text-diary-ink/70 hover:text-diary-ink font-medium",
				children: "← Back"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl",
				children: "💗"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-md mx-auto w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold text-diary-ink",
					children: "Eun's moods"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-diary-ink/60 mt-2 text-sm",
					children: "A little trail of how you've felt."
				}),
				loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 text-center text-diary-ink/50 text-sm",
					children: "Loading…"
				}) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 text-center bg-white/70 backdrop-blur rounded-3xl p-8 shadow-diary-soft border border-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-5xl mb-4",
							children: "🌸"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-diary-ink/70",
							children: "No entries yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-block mt-6 rounded-full bg-diary-pink text-white font-semibold px-6 py-3 shadow-diary-glow",
							children: "Write your first ✨"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3",
					children: entries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "bg-white/70 backdrop-blur rounded-2xl p-4 shadow-diary-soft border border-white flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-4xl",
								children: e.emoji
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-diary-ink/50",
										children: formatDate(e.createdAt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-diary-ink",
										children: e.mood
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-diary-ink/60 truncate",
										children: e.text
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-semibold text-diary-ink",
									children: e.score
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-diary-ink/40",
									children: "/100"
								})]
							})
						]
					}, e.id))
				})
			]
		})]
	});
}
//#endregion
export { History as component };
