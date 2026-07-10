import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as saveMoodEntry, t as analyzeMood } from "./mood.functions-1ScI9ZIH.mjs";
import { n as setCurrent } from "./mood-storage-B3Y3ZBxr.mjs";
import { t as nanoid } from "../_libs/nanoid.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-KHxlQn_E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [text, setText] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const analyze = useServerFn(analyzeMood);
	const save = useServerFn(saveMoodEntry);
	const MAX = 280;
	const remaining = text.length;
	async function onSubmit(e) {
		e.preventDefault();
		if (!text.trim() || loading) return;
		setLoading(true);
		setError(null);
		try {
			const entry = {
				...await analyze({ data: { text: text.trim() } }),
				id: nanoid(),
				text: text.trim(),
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			await save({ data: entry });
			setCurrent(entry);
			navigate({ to: "/result" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-diary-gradient px-5 py-10 flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between mb-8 max-w-md mx-auto w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl",
				children: "💗"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/history",
				className: "text-sm text-diary-ink/70 hover:text-diary-ink transition-colors font-medium",
				children: "History"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 max-w-md mx-auto w-full flex flex-col justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold text-diary-ink text-center leading-snug",
					children: "How is Eun feeling today? 💗"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-diary-ink/60 mt-3 text-sm",
					children: "Write it out — I'll listen babe."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/70 backdrop-blur rounded-3xl p-5 shadow-diary-soft border border-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: text,
								onChange: (e) => setText(e.target.value.slice(0, MAX)),
								placeholder: "Today I feel…",
								rows: 6,
								maxLength: MAX,
								className: "w-full resize-none bg-transparent outline-none text-diary-ink placeholder:text-diary-ink/30 text-lg leading-relaxed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end text-xs text-diary-ink/40 mt-2",
								children: [
									remaining,
									"/",
									MAX
								]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-center text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !text.trim() || loading,
							className: "mt-6 w-full rounded-full bg-diary-pink text-white font-semibold py-4 text-base shadow-diary-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100",
							children: loading ? "Feeling it out…" : "Analyze Eun's Mood ✨"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
