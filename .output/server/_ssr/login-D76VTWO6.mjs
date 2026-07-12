import { n as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as checkPasscode } from "./auth.functions-xWviLBsq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D76VTWO6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [passcode, setPasscode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const submitPasscode = useServerFn(checkPasscode);
	async function onSubmit(e) {
		e.preventDefault();
		if (!passcode || loading) return;
		setLoading(true);
		setError(null);
		try {
			await submitPasscode({ data: { passcode } });
			navigate({ to: "/" });
		} catch {
			setError("That passcode isn't right — try again.");
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-diary-gradient px-5 py-10 flex flex-col items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "w-full max-w-sm bg-white/70 backdrop-blur rounded-3xl p-8 shadow-diary-soft border border-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-4xl text-center mb-4",
					children: "💗"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold text-diary-ink text-center mb-6",
					children: "Enter passcode"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: passcode,
					onChange: (e) => setPasscode(e.target.value),
					className: "w-full rounded-xl border border-diary-ink/10 px-4 py-3 mb-3 outline-none focus:border-diary-pink",
					placeholder: "Passcode",
					autoFocus: true
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-red-500 mb-3",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading,
					className: "w-full rounded-full bg-diary-pink text-white font-semibold px-6 py-3 shadow-diary-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50",
					children: loading ? "Checking…" : "Enter"
				})
			]
		})
	});
}
//#endregion
export { Login as component };
