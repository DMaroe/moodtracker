import { n as __esmMin, r as __exportAll } from "../_runtime.mjs";
import __cjs_mod__ from "node:module";
import __cjs_url__ from "node:url";
import path from "node:path";
//#region node_modules/@cloudflare/unenv-preset/dist/index.mjs
var dist_exports = /* @__PURE__ */ __exportAll({
	getCloudflarePreset: () => getCloudflarePreset,
	nonPrefixedNodeModules: () => nonPrefixedNodeModules
});
function getCloudflarePreset({ compatibilityDate = "2024-09-03", compatibilityFlags = [] }) {
	const compat = {
		compatibilityDate,
		compatibilityFlags
	};
	const overrides = [
		getHttpOverrides(compat),
		getHttp2Overrides(compat),
		getOsOverrides(compat),
		getFsOverrides(compat),
		getPunycodeOverrides(compat),
		getClusterOverrides(compat),
		getTraceEventsOverrides(compat),
		getDomainOverrides(compat),
		getWasiOverrides(compat),
		getConsoleOverrides(compat),
		getVmOverrides(compat),
		getInspectorOverrides(compat),
		getSqliteOverrides(compat),
		getDgramOverrides(compat),
		getStreamWrapOverrides(compat),
		getReplOverrides(compat),
		getProcessOverrides(compat),
		getV8Overrides(compat),
		getTtyOverrides(compat),
		getChildProcessOverrides(compat),
		getWorkerThreadsOverrides(compat),
		getReadlineOverrides(compat),
		getPerfHooksOverrides(compat)
	];
	const nativeModules = [...defaultNativeModules, ...overrides.flatMap((o) => o.nativeModules)];
	const hybridModules = overrides.flatMap((o) => o.hybridModules);
	const injects = Object.assign({}, ...overrides.map((o) => o.inject ?? {}));
	const polyfills = overrides.flatMap((o) => o.polyfills ?? []);
	return {
		meta: {
			name: "unenv:cloudflare",
			version,
			url: __filename
		},
		alias: {
			...Object.fromEntries(nativeModules.flatMap((p) => [[p, p], [`node:${p}`, `node:${p}`]])),
			...Object.fromEntries(hybridModules.flatMap((m) => [[m, `@cloudflare/unenv-preset/node/${m}`], [`node:${m}`, `@cloudflare/unenv-preset/node/${m}`]]))
		},
		inject: {
			Buffer: false,
			global: false,
			clearImmediate: false,
			setImmediate: false,
			...injects
		},
		polyfill: polyfills,
		external: nativeModules.flatMap((p) => [p, `node:${p}`])
	};
}
function getHttpOverrides({ compatibilityDate, compatibilityFlags }) {
	const httpDisabledByFlag = compatibilityFlags.includes("disable_nodejs_http_modules");
	if (!((compatibilityFlags.includes("enable_nodejs_http_modules") || compatibilityDate >= "2025-08-15") && !httpDisabledByFlag)) return {
		nativeModules: [],
		hybridModules: []
	};
	const httpServerEnabledByFlag = compatibilityFlags.includes("enable_nodejs_http_server_modules");
	const httpServerDisabledByFlag = compatibilityFlags.includes("disable_nodejs_http_server_modules");
	return {
		nativeModules: [
			"_http_agent",
			"_http_client",
			"_http_common",
			"_http_incoming",
			"_http_outgoing",
			...(httpServerEnabledByFlag || compatibilityDate >= "2025-09-01") && !httpServerDisabledByFlag ? ["_http_server"] : [],
			"http",
			"https"
		],
		hybridModules: []
	};
}
function getHttp2Overrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_http2_module");
	return (compatibilityFlags.includes("enable_nodejs_http2_module") || compatibilityDate >= "2025-09-01") && !disabledByFlag ? {
		nativeModules: ["http2"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getOsOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_os_module");
	return (compatibilityFlags.includes("enable_nodejs_os_module") || compatibilityDate >= "2025-09-15") && !disabledByFlag ? {
		nativeModules: ["os"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getFsOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_fs_module");
	return (compatibilityFlags.includes("enable_nodejs_fs_module") || compatibilityDate >= "2025-09-15") && !disabledByFlag ? {
		nativeModules: ["fs/promises", "fs"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getPunycodeOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_punycode_module");
	return (compatibilityFlags.includes("enable_nodejs_punycode_module") || compatibilityDate >= "2025-12-04") && !disabledByFlag ? {
		nativeModules: ["punycode"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getClusterOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_cluster_module");
	return (compatibilityFlags.includes("enable_nodejs_cluster_module") || compatibilityDate >= "2025-12-04") && !disabledByFlag ? {
		nativeModules: ["cluster"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getTraceEventsOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_trace_events_module");
	return (compatibilityFlags.includes("enable_nodejs_trace_events_module") || compatibilityDate >= "2025-12-04") && !disabledByFlag ? {
		nativeModules: ["trace_events"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getDomainOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_domain_module");
	return (compatibilityFlags.includes("enable_nodejs_domain_module") || compatibilityDate >= "2025-12-04") && !disabledByFlag ? {
		nativeModules: ["domain"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getWasiOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_wasi_module");
	return (compatibilityFlags.includes("enable_nodejs_wasi_module") || compatibilityDate >= "2025-12-04") && !disabledByFlag ? {
		nativeModules: ["wasi"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getConsoleOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_console_module");
	return (compatibilityFlags.includes("enable_nodejs_console_module") || compatibilityDate >= "2025-09-21") && !disabledByFlag ? {
		nativeModules: ["console"],
		hybridModules: [],
		inject: {}
	} : {
		nativeModules: [],
		hybridModules: ["console"],
		inject: { console: "@cloudflare/unenv-preset/node/console" }
	};
}
function getVmOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_vm_module");
	return (compatibilityFlags.includes("enable_nodejs_vm_module") || compatibilityDate >= "2025-10-01") && !disabledByFlag ? {
		nativeModules: ["vm"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getInspectorOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_inspector_module");
	return (compatibilityFlags.includes("enable_nodejs_inspector_module") || compatibilityDate >= "2026-01-29") && !disabledByFlag ? {
		nativeModules: ["inspector/promises", "inspector"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getSqliteOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_sqlite_module");
	return (compatibilityFlags.includes("enable_nodejs_sqlite_module") || compatibilityDate >= "2026-01-29") && !disabledByFlag ? {
		nativeModules: ["sqlite"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getDgramOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_dgram_module");
	return (compatibilityFlags.includes("enable_nodejs_dgram_module") || compatibilityDate >= "2026-01-29") && !disabledByFlag ? {
		nativeModules: ["dgram"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getStreamWrapOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_stream_wrap_module");
	return (compatibilityFlags.includes("enable_nodejs_stream_wrap_module") || compatibilityDate >= "2026-01-29") && !disabledByFlag ? {
		nativeModules: ["_stream_wrap"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getReplOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_repl_module");
	return (compatibilityFlags.includes("enable_nodejs_repl_module") || compatibilityDate >= "2026-03-17") && !disabledByFlag ? {
		nativeModules: ["repl"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getProcessOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledV2ByFlag = compatibilityFlags.includes("disable_nodejs_process_v2");
	const enabledV2ByFlag = compatibilityFlags.includes("enable_nodejs_process_v2");
	const enabledV2ByDate = compatibilityDate >= "2025-09-15";
	return hasFetchIterableFixes({
		compatibilityDate,
		compatibilityFlags
	}) && (enabledV2ByFlag || enabledV2ByDate) && !disabledV2ByFlag ? {
		nativeModules: ["process"],
		hybridModules: [],
		inject: { process: false }
	} : {
		nativeModules: [],
		hybridModules: ["process"],
		inject: { process: "@cloudflare/unenv-preset/node/process" }
	};
}
function hasFetchIterableFixes({ compatibilityDate, compatibilityFlags }) {
	const supportEnabledByFlag = compatibilityFlags.includes("fetch_iterable_type_support");
	const supportDisabledByFlag = compatibilityFlags.includes("no_fetch_iterable_type_support");
	if (!((compatibilityDate >= "2026-02-19" || supportEnabledByFlag) && !supportDisabledByFlag)) return false;
	const adjustmentEnabledByFlag = compatibilityFlags.includes("fetch_iterable_type_support_override_adjustment");
	const adjustmentDisabledByFlag = compatibilityFlags.includes("no_fetch_iterable_type_support_override_adjustment");
	return (adjustmentEnabledByFlag || compatibilityDate >= "2026-01-15") && !adjustmentDisabledByFlag;
}
function getV8Overrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_v8_module");
	return (compatibilityFlags.includes("enable_nodejs_v8_module") || compatibilityDate >= "2026-03-17") && !disabledByFlag ? {
		nativeModules: ["v8"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getTtyOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_tty_module");
	return (compatibilityFlags.includes("enable_nodejs_tty_module") || compatibilityDate >= "2026-03-17") && !disabledByFlag ? {
		nativeModules: ["tty"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getChildProcessOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_child_process_module");
	return (compatibilityFlags.includes("enable_nodejs_child_process_module") || compatibilityDate >= "2026-03-17") && !disabledByFlag ? {
		nativeModules: ["child_process"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getWorkerThreadsOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_worker_threads_module");
	return (compatibilityFlags.includes("enable_nodejs_worker_threads_module") || compatibilityDate >= "2026-03-17") && !disabledByFlag ? {
		nativeModules: ["worker_threads"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getReadlineOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_readline_module");
	return (compatibilityFlags.includes("enable_nodejs_readline_module") || compatibilityDate >= "2026-03-17") && !disabledByFlag ? {
		nativeModules: ["readline", "readline/promises"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: []
	};
}
function getPerfHooksOverrides({ compatibilityDate, compatibilityFlags }) {
	const disabledByFlag = compatibilityFlags.includes("disable_nodejs_perf_hooks_module");
	return (compatibilityFlags.includes("enable_nodejs_perf_hooks_module") || compatibilityDate >= "2026-03-17") && !disabledByFlag ? {
		nativeModules: ["perf_hooks"],
		hybridModules: []
	} : {
		nativeModules: [],
		hybridModules: [],
		polyfills: ["@cloudflare/unenv-preset/polyfill/performance"]
	};
}
var __filename, version, defaultNativeModules, nonPrefixedNodeModules;
var init_dist = __esmMin((() => {
	__filename = __cjs_url__.fileURLToPath(import.meta.url);
	path.dirname(__filename);
	__cjs_mod__.createRequire(import.meta.url || "file:///");
	version = "2.16.1";
	defaultNativeModules = [
		"_stream_duplex",
		"_stream_passthrough",
		"_stream_readable",
		"_stream_transform",
		"_stream_writable",
		"_tls_common",
		"_tls_wrap",
		"assert",
		"assert/strict",
		"async_hooks",
		"buffer",
		"constants",
		"crypto",
		"diagnostics_channel",
		"dns",
		"dns/promises",
		"events",
		"net",
		"path",
		"path/posix",
		"path/win32",
		"querystring",
		"module",
		"stream",
		"stream/consumers",
		"stream/promises",
		"stream/web",
		"string_decoder",
		"sys",
		"timers",
		"timers/promises",
		"tls",
		"url",
		"util",
		"util/types",
		"zlib"
	];
	nonPrefixedNodeModules = [
		"_http_agent",
		"_http_client",
		"_http_common",
		"_http_incoming",
		"_http_outgoing",
		"_http_server",
		"_stream_duplex",
		"_stream_passthrough",
		"_stream_readable",
		"_stream_transform",
		"_stream_wrap",
		"_stream_writable",
		"_tls_common",
		"_tls_wrap",
		"assert",
		"assert/strict",
		"async_hooks",
		"buffer",
		"child_process",
		"cluster",
		"console",
		"constants",
		"crypto",
		"dgram",
		"diagnostics_channel",
		"dns",
		"dns/promises",
		"domain",
		"events",
		"fs",
		"fs/promises",
		"http",
		"http2",
		"https",
		"inspector",
		"inspector/promises",
		"module",
		"net",
		"os",
		"path",
		"path/posix",
		"path/win32",
		"perf_hooks",
		"process",
		"punycode",
		"querystring",
		"readline",
		"readline/promises",
		"repl",
		"stream",
		"stream/consumers",
		"stream/promises",
		"stream/web",
		"string_decoder",
		"sys",
		"timers",
		"timers/promises",
		"tls",
		"trace_events",
		"tty",
		"url",
		"util",
		"util/types",
		"v8",
		"vm",
		"wasi",
		"worker_threads",
		"zlib"
	];
	getCloudflarePreset({});
}));
//#endregion
export { init_dist as n, dist_exports as t };
