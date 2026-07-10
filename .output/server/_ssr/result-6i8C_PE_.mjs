import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as getCurrent } from "./mood-storage-B3Y3ZBxr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result-6i8C_PE_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Result() {
	const [entry, setEntry] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const cur = getCurrent();
		if (!cur) {
			navigate({ to: "/" });
			return;
		}
		setEntry(cur);
	}, [navigate]);
	if (!entry) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-diary-gradient-warm px-5 py-10 flex flex-col relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -left-32 w-80 h-80 rounded-full bg-diary-pink/30 blur-3xl animate-float-slow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-diary-blue/30 blur-3xl animate-float-slower" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative flex items-center justify-between max-w-md mx-auto w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-diary-ink/70 hover:text-diary-ink font-medium",
					children: "← New entry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/history",
					className: "text-sm text-diary-ink/70 hover:text-diary-ink font-medium",
					children: "History"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative flex-1 max-w-md mx-auto w-full flex flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-9xl animate-emoji-pop drop-shadow-sm",
						children: entry.emoji
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 text-4xl font-semibold text-diary-ink",
						children: entry.mood
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 text-lg text-diary-ink/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-semibold text-diary-ink",
							children: entry.score
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-diary-ink/50",
							children: "/100"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 bg-white/70 backdrop-blur rounded-3xl p-6 shadow-diary-soft border border-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-diary-ink/80 leading-relaxed italic",
							children: [
								"\"",
								entry.summary,
								"\""
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-10 rounded-full bg-diary-pink text-white font-semibold px-8 py-4 shadow-diary-glow transition-all hover:scale-[1.02] active:scale-[0.98]",
						children: "Write another 💗"
					})
				]
			})
		]
	});
}
//#endregion
export { Result as component };
