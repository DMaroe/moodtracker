import { n as __esmMin } from "../_runtime.mjs";

//#region node_modules/@poppinss/exception/build/index.js
var Exception;
var init_build = __esmMin((() => {
	Exception = class extends Error {
		name;
		status;
		constructor(message, options) {
			super(message, options);
			const ErrorConstructor = this.constructor;
			this.name = ErrorConstructor.name;
			this.message = message || ErrorConstructor.message || "";
			this.status = options?.status || ErrorConstructor.status || 500;
			const code = options?.code || ErrorConstructor.code;
			if (code !== void 0) this.code = code;
			const help = ErrorConstructor.help;
			if (help !== void 0) this.help = help;
			Error.captureStackTrace(this, ErrorConstructor);
		}
		get [Symbol.toStringTag]() {
			return this.constructor.name;
		}
		toString() {
			if (this.code) return `${this.name} [${this.code}]: ${this.message}`;
			return `${this.name}: ${this.message}`;
		}
	};
}));
//#endregion
export { init_build as n, Exception as t };
