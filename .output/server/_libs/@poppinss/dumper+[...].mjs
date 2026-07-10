import { n as __esmMin } from "../../_runtime.mjs";
import { n as init_build, t as colors_default } from "../kleur+poppinss__colors.mjs";
import { inspect } from "node:util";
var init_utilities = __esmMin((() => {}));
//#endregion
//#region node_modules/@sindresorhus/is/distribution/index.js
function isTypedArrayName(name) {
	return typedArrayTypeNames.includes(name);
}
function isObjectTypeName(name) {
	return objectTypeNames.includes(name);
}
function isPrimitiveTypeName(name) {
	return primitiveTypeNames.includes(name);
}
function detect(value) {
	if (value === null) return "null";
	switch (typeof value) {
		case "undefined": return "undefined";
		case "string": return "string";
		case "number": return Number.isNaN(value) ? "NaN" : "number";
		case "boolean": return "boolean";
		case "function": return "Function";
		case "bigint": return "bigint";
		case "symbol": return "symbol";
		default:
	}
	if (isObservable(value)) return "Observable";
	if (isArray(value)) return "Array";
	if (isBuffer(value)) return "Buffer";
	const tagType = getObjectType(value);
	if (tagType && tagType !== "Object") return tagType;
	if (hasPromiseApi(value)) return "Promise";
	if (value instanceof String || value instanceof Boolean || value instanceof Number) throw new TypeError("Please don't use object wrappers for primitive types");
	return "Object";
}
function hasPromiseApi(value) {
	return isFunction(value?.then) && isFunction(value?.catch);
}
function isAbsoluteModule2(remainder) {
	return (value) => isInteger(value) && Math.abs(value % 2) === remainder;
}
function validatePredicateArray(predicateArray, allowEmpty) {
	if (predicateArray.length === 0) {
		if (allowEmpty) {} else throw new TypeError("Invalid predicate array");
		return;
	}
	for (const predicate of predicateArray) if (!isFunction(predicate)) throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
}
function isAll(predicate, ...values) {
	if (Array.isArray(predicate)) {
		const predicateArray = predicate;
		validatePredicateArray(predicateArray, values.length === 0);
		const combinedPredicate = (value) => predicateArray.every((singlePredicate) => singlePredicate(value));
		if (values.length === 0) return combinedPredicate;
		return predicateOnArray(Array.prototype.every, combinedPredicate, values);
	}
	return predicateOnArray(Array.prototype.every, predicate, values);
}
function isAny(predicate, ...values) {
	if (Array.isArray(predicate)) {
		const predicateArray = predicate;
		validatePredicateArray(predicateArray, values.length === 0);
		const combinedPredicate = (value) => predicateArray.some((singlePredicate) => singlePredicate(value));
		if (values.length === 0) return combinedPredicate;
		return predicateOnArray(Array.prototype.some, combinedPredicate, values);
	}
	return predicateOnArray(Array.prototype.some, predicate, values);
}
function isOptional(value, predicate) {
	return isUndefined(value) || predicate(value);
}
function isArray(value, assertion) {
	if (!Array.isArray(value)) return false;
	if (!isFunction(assertion)) return true;
	return value.every((element) => assertion(element));
}
function isArrayBuffer(value) {
	return getObjectType(value) === "ArrayBuffer";
}
function isArrayLike(value) {
	return !isNullOrUndefined(value) && !isFunction(value) && isValidLength(value.length);
}
function isAsyncFunction(value) {
	return getObjectType(value) === "AsyncFunction";
}
function isAsyncGenerator(value) {
	return isAsyncIterable(value) && isFunction(value.next) && isFunction(value.throw);
}
function isAsyncGeneratorFunction(value) {
	return getObjectType(value) === "AsyncGeneratorFunction";
}
function isAsyncIterable(value) {
	return isFunction(value?.[Symbol.asyncIterator]);
}
function isBigint(value) {
	return typeof value === "bigint";
}
function isBigInt64Array(value) {
	return getObjectType(value) === "BigInt64Array";
}
function isBigUint64Array(value) {
	return getObjectType(value) === "BigUint64Array";
}
function isBlob(value) {
	return getObjectType(value) === "Blob";
}
function isBoolean(value) {
	return value === true || value === false;
}
function isBoundFunction(value) {
	return isFunction(value) && !Object.hasOwn(value, "prototype");
}
/**
Note: [Prefer using `Uint8Array` instead of `Buffer`.](https://sindresorhus.com/blog/goodbye-nodejs-buffer)
*/
function isBuffer(value) {
	return value?.constructor?.isBuffer?.(value) ?? false;
}
function isClass(value) {
	return isFunction(value) && /^class(\s+|{)/.test(value.toString());
}
function isDataView(value) {
	return getObjectType(value) === "DataView";
}
function isDate(value) {
	return getObjectType(value) === "Date";
}
function isDirectInstanceOf(instance, class_) {
	if (instance === void 0 || instance === null) return false;
	return Object.getPrototypeOf(instance) === class_.prototype;
}
function isEmptyArray(value) {
	return isArray(value) && value.length === 0;
}
function isEmptyMap(value) {
	return isMap(value) && value.size === 0;
}
function isEmptyObject(value) {
	return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length === 0;
}
function isEmptySet(value) {
	return isSet(value) && value.size === 0;
}
function isEmptyString(value) {
	return isString(value) && value.length === 0;
}
function isEmptyStringOrWhitespace(value) {
	return isEmptyString(value) || isWhitespaceString(value);
}
function isEnumCase(value, targetEnum) {
	return Object.values(targetEnum).includes(value);
}
function isError(value) {
	return getObjectType(value) === "Error";
}
function isEvenInteger(value) {
	return isAbsoluteModule2(0)(value);
}
function isFalsy(value) {
	return !value;
}
function isFloat32Array(value) {
	return getObjectType(value) === "Float32Array";
}
function isFloat64Array(value) {
	return getObjectType(value) === "Float64Array";
}
function isFormData(value) {
	return getObjectType(value) === "FormData";
}
function isFunction(value) {
	return typeof value === "function";
}
function isGenerator(value) {
	return isIterable(value) && isFunction(value?.next) && isFunction(value?.throw);
}
function isGeneratorFunction(value) {
	return getObjectType(value) === "GeneratorFunction";
}
function isHtmlElement(value) {
	return isObject(value) && value.nodeType === NODE_TYPE_ELEMENT && isString(value.nodeName) && !isPlainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
}
function isInfinite(value) {
	return value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;
}
function isInRange(value, range) {
	if (isNumber(range)) return value >= Math.min(0, range) && value <= Math.max(range, 0);
	if (isArray(range) && range.length === 2) return value >= Math.min(...range) && value <= Math.max(...range);
	throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
}
function isInt16Array(value) {
	return getObjectType(value) === "Int16Array";
}
function isInt32Array(value) {
	return getObjectType(value) === "Int32Array";
}
function isInt8Array(value) {
	return getObjectType(value) === "Int8Array";
}
function isInteger(value) {
	return Number.isInteger(value);
}
function isIterable(value) {
	return isFunction(value?.[Symbol.iterator]);
}
function isMap(value) {
	return getObjectType(value) === "Map";
}
function isNan(value) {
	return Number.isNaN(value);
}
function isNativePromise(value) {
	return getObjectType(value) === "Promise";
}
function isNegativeNumber(value) {
	return isNumber(value) && value < 0;
}
function isNodeStream(value) {
	return isObject(value) && isFunction(value.pipe) && !isObservable(value);
}
function isNonEmptyArray(value) {
	return isArray(value) && value.length > 0;
}
function isNonEmptyMap(value) {
	return isMap(value) && value.size > 0;
}
function isNonEmptyObject(value) {
	return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length > 0;
}
function isNonEmptySet(value) {
	return isSet(value) && value.size > 0;
}
function isNonEmptyString(value) {
	return isString(value) && value.length > 0;
}
function isNonEmptyStringAndNotWhitespace(value) {
	return isString(value) && !isEmptyStringOrWhitespace(value);
}
function isNull(value) {
	return value === null;
}
function isNullOrUndefined(value) {
	return isNull(value) || isUndefined(value);
}
function isNumber(value) {
	return typeof value === "number" && !Number.isNaN(value);
}
function isNumericString(value) {
	return isString(value) && !isEmptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
}
function isObject(value) {
	return !isNull(value) && (typeof value === "object" || isFunction(value));
}
function isObservable(value) {
	if (!value) return false;
	if (Symbol.observable !== void 0 && value === value[Symbol.observable]?.()) return true;
	if (value === value["@@observable"]?.()) return true;
	return false;
}
function isOddInteger(value) {
	return isAbsoluteModule2(1)(value);
}
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function isPositiveNumber(value) {
	return isNumber(value) && value > 0;
}
function isPrimitive(value) {
	return isNull(value) || isPrimitiveTypeName(typeof value);
}
function isPromise(value) {
	return isNativePromise(value) || hasPromiseApi(value);
}
function isPropertyKey(value) {
	return isAny([
		isString,
		isNumber,
		isSymbol
	], value);
}
function isRegExp(value) {
	return getObjectType(value) === "RegExp";
}
function isSafeInteger(value) {
	return Number.isSafeInteger(value);
}
function isSet(value) {
	return getObjectType(value) === "Set";
}
function isSharedArrayBuffer(value) {
	return getObjectType(value) === "SharedArrayBuffer";
}
function isString(value) {
	return typeof value === "string";
}
function isSymbol(value) {
	return typeof value === "symbol";
}
function isTruthy(value) {
	return Boolean(value);
}
function isTupleLike(value, guards) {
	if (isArray(guards) && isArray(value) && guards.length === value.length) return guards.every((guard, index) => guard(value[index]));
	return false;
}
function isTypedArray(value) {
	return isTypedArrayName(getObjectType(value));
}
function isUint16Array(value) {
	return getObjectType(value) === "Uint16Array";
}
function isUint32Array(value) {
	return getObjectType(value) === "Uint32Array";
}
function isUint8Array(value) {
	return getObjectType(value) === "Uint8Array";
}
function isUint8ClampedArray(value) {
	return getObjectType(value) === "Uint8ClampedArray";
}
function isUndefined(value) {
	return value === void 0;
}
function isUrlInstance(value) {
	return getObjectType(value) === "URL";
}
function isUrlSearchParams(value) {
	return getObjectType(value) === "URLSearchParams";
}
function isUrlString(value) {
	if (!isString(value)) return false;
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}
function isValidDate(value) {
	return isDate(value) && !isNan(Number(value));
}
function isValidLength(value) {
	return isSafeInteger(value) && value >= 0;
}
function isWeakMap(value) {
	return getObjectType(value) === "WeakMap";
}
function isWeakRef(value) {
	return getObjectType(value) === "WeakRef";
}
function isWeakSet(value) {
	return getObjectType(value) === "WeakSet";
}
function isWhitespaceString(value) {
	return isString(value) && /^\s+$/.test(value);
}
function predicateOnArray(method, predicate, values) {
	if (!isFunction(predicate)) throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
	if (values.length === 0) throw new TypeError("Invalid number of values");
	return method.call(values, predicate);
}
var typedArrayTypeNames, objectTypeNames, primitiveTypeNames, getObjectType, is, NODE_TYPE_ELEMENT, DOM_PROPERTIES_TO_CHECK;
var init_distribution = __esmMin((() => {
	init_utilities();
	typedArrayTypeNames = [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array",
		"BigInt64Array",
		"BigUint64Array"
	];
	objectTypeNames = [
		"Function",
		"Generator",
		"AsyncGenerator",
		"GeneratorFunction",
		"AsyncGeneratorFunction",
		"AsyncFunction",
		"Observable",
		"Array",
		"Buffer",
		"Blob",
		"Object",
		"RegExp",
		"Date",
		"Error",
		"Map",
		"Set",
		"WeakMap",
		"WeakSet",
		"WeakRef",
		"ArrayBuffer",
		"SharedArrayBuffer",
		"DataView",
		"Promise",
		"URL",
		"FormData",
		"URLSearchParams",
		"HTMLElement",
		"NaN",
		...typedArrayTypeNames
	];
	primitiveTypeNames = [
		"null",
		"undefined",
		"string",
		"number",
		"bigint",
		"boolean",
		"symbol"
	];
	[...objectTypeNames, ...primitiveTypeNames];
	getObjectType = (value) => {
		const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
		if (/HTML\w+Element/.test(objectTypeName) && isHtmlElement(value)) return "HTMLElement";
		if (isObjectTypeName(objectTypeName)) return objectTypeName;
	};
	is = Object.assign(detect, {
		all: isAll,
		any: isAny,
		array: isArray,
		arrayBuffer: isArrayBuffer,
		arrayLike: isArrayLike,
		asyncFunction: isAsyncFunction,
		asyncGenerator: isAsyncGenerator,
		asyncGeneratorFunction: isAsyncGeneratorFunction,
		asyncIterable: isAsyncIterable,
		bigint: isBigint,
		bigInt64Array: isBigInt64Array,
		bigUint64Array: isBigUint64Array,
		blob: isBlob,
		boolean: isBoolean,
		boundFunction: isBoundFunction,
		buffer: isBuffer,
		class: isClass,
		dataView: isDataView,
		date: isDate,
		detect,
		directInstanceOf: isDirectInstanceOf,
		emptyArray: isEmptyArray,
		emptyMap: isEmptyMap,
		emptyObject: isEmptyObject,
		emptySet: isEmptySet,
		emptyString: isEmptyString,
		emptyStringOrWhitespace: isEmptyStringOrWhitespace,
		enumCase: isEnumCase,
		error: isError,
		evenInteger: isEvenInteger,
		falsy: isFalsy,
		float32Array: isFloat32Array,
		float64Array: isFloat64Array,
		formData: isFormData,
		function: isFunction,
		generator: isGenerator,
		generatorFunction: isGeneratorFunction,
		htmlElement: isHtmlElement,
		infinite: isInfinite,
		inRange: isInRange,
		int16Array: isInt16Array,
		int32Array: isInt32Array,
		int8Array: isInt8Array,
		integer: isInteger,
		iterable: isIterable,
		map: isMap,
		nan: isNan,
		nativePromise: isNativePromise,
		negativeNumber: isNegativeNumber,
		nodeStream: isNodeStream,
		nonEmptyArray: isNonEmptyArray,
		nonEmptyMap: isNonEmptyMap,
		nonEmptyObject: isNonEmptyObject,
		nonEmptySet: isNonEmptySet,
		nonEmptyString: isNonEmptyString,
		nonEmptyStringAndNotWhitespace: isNonEmptyStringAndNotWhitespace,
		null: isNull,
		nullOrUndefined: isNullOrUndefined,
		number: isNumber,
		numericString: isNumericString,
		object: isObject,
		observable: isObservable,
		oddInteger: isOddInteger,
		plainObject: isPlainObject,
		positiveNumber: isPositiveNumber,
		primitive: isPrimitive,
		promise: isPromise,
		propertyKey: isPropertyKey,
		regExp: isRegExp,
		safeInteger: isSafeInteger,
		set: isSet,
		sharedArrayBuffer: isSharedArrayBuffer,
		string: isString,
		symbol: isSymbol,
		truthy: isTruthy,
		tupleLike: isTupleLike,
		typedArray: isTypedArray,
		uint16Array: isUint16Array,
		uint32Array: isUint32Array,
		uint8Array: isUint8Array,
		uint8ClampedArray: isUint8ClampedArray,
		undefined: isUndefined,
		urlInstance: isUrlInstance,
		urlSearchParams: isUrlSearchParams,
		urlString: isUrlString,
		optional: isOptional,
		validDate: isValidDate,
		validLength: isValidLength,
		weakMap: isWeakMap,
		weakRef: isWeakRef,
		weakSet: isWeakSet,
		whitespaceString: isWhitespaceString
	});
	NODE_TYPE_ELEMENT = 1;
	DOM_PROPERTIES_TO_CHECK = [
		"innerHTML",
		"ownerDocument",
		"style",
		"attributes",
		"nodeValue"
	];
	new Intl.ListFormat("en", {
		style: "long",
		type: "conjunction"
	});
	new Intl.ListFormat("en", {
		style: "long",
		type: "disjunction"
	});
}));
//#endregion
//#region node_modules/@poppinss/dumper/build/chunk-26HALFTP.js
function tokenizeObject(value, parser, config) {
	parser.context.objectsSeen = parser.context.objectsSeen ?? /* @__PURE__ */ new Set();
	parser.context.depth = parser.context.depth ?? 0;
	if (parser.context.objectsSeen.has(value)) {
		parser.collect({ type: "object-circular-ref" });
		return;
	}
	if (parser.context.depth >= parser.config.depth) {
		parser.collect({ type: "object-max-depth-ref" });
		return;
	}
	const showHidden = config.showHidden;
	const name = config.constructorName ?? Object.getPrototypeOf(value)?.constructor.name ?? null;
	if (config.collapse.includes(name)) {
		parser.collect({
			type: "collapse",
			name,
			token: {
				type: "object-start",
				constructorName: name
			}
		});
		return;
	}
	const ownKeys = Reflect.ownKeys(value);
	const eagerGetters = config.eagerGetters ?? [];
	parser.context.depth++;
	parser.context.objectsSeen.add(value);
	let keys = [];
	if (config.membersToIgnore) {
		const keysSet = /* @__PURE__ */ new Set([...ownKeys]);
		config.membersToIgnore.forEach((m) => keysSet.delete(m));
		keys = Array.from(keysSet);
	} else keys = ownKeys;
	parser.collect({
		type: "object-start",
		constructorName: name
	});
	for (let key of keys) {
		const descriptor = Object.getOwnPropertyDescriptor(value, key);
		if (!descriptor) continue;
		if (!descriptor.enumerable && !showHidden) continue;
		const isSymbol = typeof key === "symbol";
		const isWritable = !!descriptor.set || !!descriptor.writable;
		parser.collect({
			type: "object-key",
			isSymbol,
			isWritable,
			value: String(key)
		});
		if ("get" in descriptor && !eagerGetters.includes(key)) {
			parser.collect({ type: "object-value-getter" });
			continue;
		}
		parser.collect({ type: "object-value-start" });
		parser.parse(value[key]);
		parser.collect({ type: "object-value-end" });
	}
	if (config.inspectObjectPrototype === true) tokenizePrototype(value, parser, { membersToIgnore: ObjectPrototypeKeys });
	else if (config.inspectObjectPrototype === "unless-plain-object" && !is.plainObject(value)) tokenizePrototype(value, parser, {
		membersToIgnore: ObjectPrototypeKeys,
		prototypeToIgnore: ObjectPrototype
	});
	parser.collect({ type: "object-end" });
	parser.context.depth--;
	parser.context.objectsSeen.delete(value);
}
function tokenizePrototype(value, parser, config) {
	const prototypeChain = [];
	for (let proto = Object.getPrototypeOf(value); proto && (!config.prototypeToIgnore || proto !== config.prototypeToIgnore); proto = Object.getPrototypeOf(proto)) {
		let keys = Reflect.ownKeys(proto);
		if (config.membersToIgnore) {
			const keysSet = /* @__PURE__ */ new Set([...keys]);
			config.membersToIgnore.forEach((m) => keysSet.delete(m));
			keys = Array.from(keysSet);
		}
		prototypeChain.push({
			proto,
			keys
		});
	}
	if (!prototypeChain.length) return;
	const eagerGetters = config.eagerGetters ?? [];
	parser.collect({ type: "prototype-start" });
	for (let proto of prototypeChain) for (let key of proto.keys) {
		if (key === "constructor") continue;
		const descriptor = Object.getOwnPropertyDescriptor(proto.proto, key);
		if (!descriptor) continue;
		const isSymbol = typeof key === "symbol";
		const isWritable = !!descriptor.set || !!descriptor.writable;
		parser.collect({
			type: "object-key",
			isSymbol,
			isWritable,
			value: String(key)
		});
		if ("get" in descriptor && !eagerGetters.includes(key)) {
			parser.collect({ type: "object-value-getter" });
			continue;
		}
		parser.collect({ type: "object-value-start" });
		parser.parse(value[key]);
		parser.collect({ type: "object-value-end" });
	}
	parser.collect({ type: "prototype-end" });
}
function tokenizeArray(values, parser, config) {
	parser.context.arraysSeen = parser.context.arraysSeen ?? /* @__PURE__ */ new Set();
	parser.context.depth = parser.context.depth ?? 0;
	if (parser.context.arraysSeen.has(values)) {
		parser.collect({ type: "array-circular-ref" });
		return;
	}
	if (parser.context.depth >= config.depth) {
		parser.collect({ type: "array-max-depth-ref" });
		return;
	}
	const limit = config.maxArrayLength;
	const size = values.length;
	const name = config.name || values.constructor.name;
	if (config.collapse.includes(name)) {
		parser.collect({
			type: "collapse",
			name,
			token: {
				type: "array-start",
				name,
				size
			}
		});
		return;
	}
	parser.context.depth++;
	parser.context.arraysSeen.add(values);
	parser.collect({
		type: "array-start",
		name,
		size
	});
	for (let index = 0; index < size; index++) {
		if (index >= limit) {
			parser.collect({
				type: "array-max-length-ref",
				limit,
				size
			});
			break;
		}
		const value = values[index];
		if (Object.hasOwn(values, index)) {
			parser.collect({
				type: "array-value-start",
				index
			});
			parser.parse(value);
			parser.collect({
				type: "array-value-end",
				index
			});
		} else parser.collect({
			type: "array-value-hole",
			index
		});
	}
	if (config.inspectArrayPrototype) tokenizePrototype(values, parser, {
		membersToIgnore: ArrayPrototypeKeys,
		prototypeToIgnore: ArrayPrototype
	});
	parser.collect({
		type: "array-end",
		size
	});
	parser.context.depth--;
	parser.context.arraysSeen.delete(values);
}
function htmlEscape(value) {
	return value.replace(/&/g, "&amp;").replace(/\\"/g, "&bsol;&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function wordWrap(value, options) {
	const width = options.width;
	const indent = options.indent;
	const newLine = `${options.newLine}${indent}`;
	let regexString = ".{1," + width + "}";
	regexString += "([\\s​]+|$)|[^\\s​]+?([\\s​]+|$)";
	const re = new RegExp(regexString, "g");
	return (value.match(re) || []).map(function(line) {
		if (line.slice(-1) === "\n") line = line.slice(0, line.length - 1);
		return options.escape ? options.escape(line) : htmlEscape(line);
	}).join(newLine);
}
var __defProp, __export, helpers_exports, ObjectPrototype, ArrayPrototype, ObjectPrototypeKeys, ArrayPrototypeKeys, tokenizers, Parser;
var init_chunk_26HALFTP = __esmMin((() => {
	init_distribution();
	__defProp = Object.defineProperty;
	__export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	helpers_exports = {};
	__export(helpers_exports, {
		htmlEscape: () => htmlEscape,
		tokenizeArray: () => tokenizeArray,
		tokenizeObject: () => tokenizeObject,
		tokenizePrototype: () => tokenizePrototype,
		wordWrap: () => wordWrap
	});
	ObjectPrototype = Object.prototype;
	ArrayPrototype = Array.prototype;
	ObjectPrototypeKeys = Reflect.ownKeys(ObjectPrototype);
	ArrayPrototypeKeys = Reflect.ownKeys(ArrayPrototype);
	tokenizers = {
		/**
		* Tokenizes an object and its properties.
		*  - Enable "showHidden" option to parse non-enumerable
		*  - Enable "inspectObjectPrototype" to parse prototype members
		*/
		Object: (value, parser) => {
			tokenizeObject(value, parser, parser.config);
		},
		/**
		* Tokenizes an array of values
		*/
		Array: (values, parser) => {
			tokenizeArray(values, parser, parser.config);
		},
		/**
		* Tokenizes keys and values inside a map
		*/
		Map: (values, parser) => {
			parser.context.mapsSeen = parser.context.mapsSeen ?? /* @__PURE__ */ new Set();
			parser.context.depth = parser.context.depth ?? 0;
			if (parser.context.mapsSeen.has(values)) {
				parser.collect({ type: "map-circular-ref" });
				return;
			}
			if (parser.context.depth >= parser.config.depth) {
				parser.collect({ type: "map-max-depth-ref" });
				return;
			}
			parser.context.depth++;
			parser.context.mapsSeen.add(values);
			let index = 0;
			const size = values.size;
			const limit = parser.config.maxArrayLength;
			parser.collect({
				type: "map-start",
				size
			});
			for (let [key, value] of values) {
				if (index >= limit) {
					parser.collect({
						type: "map-max-length-ref",
						limit,
						size
					});
					break;
				}
				parser.collect({
					type: "map-row-start",
					index
				});
				parser.collect({
					type: "map-key-start",
					index
				});
				parser.parse(key);
				parser.collect({
					type: "map-key-end",
					index
				});
				parser.collect({
					type: "map-value-start",
					index
				});
				parser.parse(value);
				parser.collect({
					type: "map-value-end",
					index
				});
				parser.collect({
					type: "map-row-end",
					index
				});
				index++;
			}
			parser.collect({
				type: "map-end",
				size
			});
			parser.context.depth--;
			parser.context.mapsSeen.delete(values);
		},
		/**
		* Tokenizes values inside a set
		*/
		Set: (values, parser) => {
			parser.context.setsSeen = parser.context.setsSeen ?? /* @__PURE__ */ new Set();
			parser.context.depth = parser.context.depth ?? 0;
			if (parser.context.setsSeen.has(values)) {
				parser.collect({ type: "set-circular-ref" });
				return;
			}
			if (parser.context.depth >= parser.config.depth) {
				parser.collect({ type: "set-max-depth-ref" });
				return;
			}
			parser.context.depth++;
			parser.context.setsSeen.add(values);
			let index = 0;
			const size = values.size;
			const limit = parser.config.maxArrayLength;
			parser.collect({
				type: "set-start",
				size
			});
			for (let value of values) {
				if (index >= limit) {
					parser.collect({
						type: "set-max-length-ref",
						limit,
						size
					});
					break;
				}
				parser.collect({
					type: "set-value-start",
					index
				});
				parser.parse(value);
				parser.collect({
					type: "set-value-end",
					index
				});
				index++;
			}
			parser.collect({
				type: "set-end",
				size
			});
			parser.context.depth--;
			parser.context.setsSeen.delete(values);
		},
		/**
		* Tokenizes a function. If the function is a class created
		* using the [class] keyword, we will process its static
		* members when "config.inspectClassConstructor"
		* is enabled
		*/
		Function: (value, parser) => {
			const ConstructorName = value.constructor.name;
			if (ConstructorName === "GeneratorFunction") return tokenizers.GeneratorFunction(value, parser);
			if (ConstructorName === "AsyncGeneratorFunction") return tokenizers.AsyncGeneratorFunction(value, parser);
			if (ConstructorName === "AsyncFunction") return tokenizers.AsyncFunction(value, parser);
			const isClass = is.class(value);
			parser.collect({
				type: "function",
				isClass,
				isAsync: false,
				isGenerator: false,
				name: value.name || "anonymous"
			});
			if (parser.config.inspectStaticMembers && isClass) {
				parser.collect({ type: "static-members-start" });
				tokenizeObject(value, parser, {
					showHidden: true,
					depth: parser.config.depth,
					inspectObjectPrototype: false,
					collapse: parser.config.collapse,
					membersToIgnore: [
						"prototype",
						"name",
						"length"
					]
				});
				parser.collect({ type: "static-members-end" });
			}
		},
		/**
		* Tokenizes a string value and handles max length and
		* correct quotes via the "util.inspect" method.
		*/
		string: (value, parser) => {
			const formatted = inspect(value, {
				maxStringLength: parser.config.maxStringLength,
				customInspect: false
			});
			parser.collect({
				type: "string",
				value: formatted
			});
		},
		/**
		* Tokenizes the URL instance as an object
		*/
		URL: (value, parser) => {
			tokenizeObject({
				hash: value.hash,
				host: value.host,
				hostname: value.hostname,
				href: value.href,
				origin: value.origin,
				password: value.password,
				pathname: value.pathname,
				port: value.port,
				protocol: value.protocol,
				search: value.search,
				searchParams: value.searchParams,
				username: value.username
			}, parser, {
				constructorName: "URL",
				...parser.config
			});
		},
		/**
		* Tokenizes the URLSearchParams instance as an object
		*/
		URLSearchParams: (value, parser) => {
			tokenizeObject(Object.fromEntries(value), parser, {
				constructorName: "URLSearchParams",
				...parser.config
			});
		},
		Error: function(value, parser) {
			tokenizeObject(value, parser, {
				eagerGetters: ["message", "stack"],
				...parser.config,
				inspectObjectPrototype: parser.config.inspectObjectPrototype === true ? true : false,
				showHidden: true
			});
		},
		FormData: function(value, parser) {
			tokenizeObject(Object.fromEntries(value.entries()), parser, {
				constructorName: "FormData",
				...parser.config
			});
		},
		/**
		* Straight forward one's
		*/
		undefined: (_, parser) => {
			parser.collect({ type: "undefined" });
		},
		null: (_, parser) => {
			parser.collect({ type: "null" });
		},
		symbol: (value, parser) => {
			parser.collect({
				type: "symbol",
				value: String(value)
			});
		},
		number: (value, parser) => {
			parser.collect({
				type: "number",
				value
			});
		},
		boolean: (value, parser) => {
			parser.collect({
				type: "boolean",
				value
			});
		},
		bigint: (value, parser) => {
			parser.collect({
				type: "bigInt",
				value: `${value.toString()}n`
			});
		},
		Date: (value, parser) => {
			parser.collect({
				type: "date",
				value: value.toISOString()
			});
		},
		RegExp: (value, parser) => {
			parser.collect({
				type: "regexp",
				value: String(value)
			});
		},
		Buffer: (value, parser) => {
			parser.collect({
				type: "buffer",
				value: inspect(value)
			});
		},
		WeakSet: (_, parser) => {
			parser.collect({ type: "weak-set" });
		},
		WeakMap: (_, parser) => {
			parser.collect({ type: "weak-map" });
		},
		WeakRef: function(_, parser) {
			parser.collect({ type: "weak-ref" });
		},
		Generator: function(_, parser) {
			parser.collect({
				type: "generator",
				isAsync: false
			});
		},
		AsyncGenerator: function(_, parser) {
			parser.collect({
				type: "generator",
				isAsync: true
			});
		},
		GeneratorFunction: function(value, parser) {
			parser.collect({
				type: "function",
				isGenerator: true,
				isClass: false,
				isAsync: false,
				name: value.name || "anonymous"
			});
		},
		AsyncGeneratorFunction: function(value, parser) {
			parser.collect({
				type: "function",
				isGenerator: true,
				isClass: false,
				isAsync: true,
				name: value.name || "anonymous"
			});
		},
		AsyncFunction: function(value, parser) {
			parser.collect({
				type: "function",
				isGenerator: false,
				isClass: false,
				isAsync: true,
				name: value.name || "anonymous"
			});
		},
		Observable: function(_, parser) {
			parser.collect({ type: "observable" });
		},
		Blob: function(value, parser) {
			parser.collect({
				type: "blob",
				size: value.size,
				contentType: value.type
			});
		},
		Promise: function(value, parser) {
			parser.collect({
				type: "promise",
				isFulfilled: !inspect(value).includes("pending")
			});
		},
		NaN: function(_, parser) {
			parser.collect({
				type: "number",
				value: NaN
			});
		},
		Int8Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		Uint8Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		Int16Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		Uint16Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		Int32Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		Uint32Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		Float32Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		Float64Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		BigInt64Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		},
		BigUint64Array: function(value, parser) {
			tokenizeArray(value, parser, parser.config);
		}
	};
	Parser = class {
		#tokens = [];
		/**
		* Config shared with tokenizers
		*/
		config;
		/**
		* Context maintained through out the parsing phase.
		* Each instance of Parser has its own context
		* that gets mutated internally.
		*/
		context;
		constructor(config, context) {
			this.context = context || {};
			this.config = Object.freeze({
				showHidden: false,
				depth: 5,
				inspectObjectPrototype: "unless-plain-object",
				inspectArrayPrototype: false,
				inspectStaticMembers: false,
				maxArrayLength: 100,
				maxStringLength: 1e3,
				collapse: [],
				...config
			});
		}
		/**
		* Normalizes the type name of a property using additional
		* bit of checks. For example, the "is" module does not
		* use instanceOf checks and hence misses out on many
		* potentional improvements.
		*/
		#normalizeTypeName(name, value) {
			if (name === "Object" && value instanceof Error) return "Error";
			return name;
		}
		/**
		* Collect a token inside the list of tokens. The order
		* of tokens matter during printing therefore you must
		* collect tokens in the right order.
		*/
		collect(token) {
			this.#tokens.push(token);
		}
		/**
		* Parses a value using the tokenizers. Under the hood the
		* tokenizers will call "parser.collect" to collect
		* tokens inside an array.
		*
		* You can use "parser.flush" method to get the list of
		* tokens.
		*/
		parse(value) {
			const typeName = this.#normalizeTypeName(is.detect(value), value);
			const tokenizer = tokenizers[typeName];
			if (tokenizer) tokenizer(value, this);
			else this.collect({
				type: "unknown",
				jsType: typeName,
				value
			});
		}
		/**
		* Returns collected tokens and resets the internal state.
		*/
		flush() {
			const tokens = this.#tokens;
			this.#tokens = [];
			this.context = {};
			return tokens;
		}
	};
}));
//#endregion
//#region node_modules/@poppinss/dumper/build/formatters/html/main.js
function openingBrace$1(formatter) {
	return `<span style="${formatter.styles.braces}">{</span>`;
}
function closingBrace$1(formatter) {
	return `<span style="${formatter.styles.braces}">}</span>`;
}
function openingBrackets$1(formatter) {
	return `<span style="${formatter.styles.brackets}">[</span>`;
}
function closingBrackets$1(formatter) {
	return `<span style="${formatter.styles.brackets}">]</span>`;
}
function createStyleSheet() {
	return `.dumper-dump, .dumper-dump pre, .dumper-dump code, .dumper-dump samp {
  font-family: JetBrains Mono, monaspace argon, Menlo, Monaco, Consolas, monospace;
}
.dumper-dump pre {
  line-height: 24px;
  font-size: 15px;
  overflow-x: auto;
  position:relative;
  z-index:99999;
  padding: 10px 15px;
  margin: 0;
}
.dumper-dump pre samp {
  position: relative;
}
.dumper-dump pre samp[hidden="true"] {
  display: none;
}
.dumper-dump .dumper-prototype-group {
  opacity: 0.5;
}

.dumper-dump .dumper-toggle {
   transform: rotate(270deg);
}

.dumper-dump .dumper-toggle span {
  display: inline-block;
  position: relative;
  top: 1px;
  margin: 0 5px;
  font-size: 14px;
}
.dumper-dump .dumper-toggle[aria-expanded="true"] {
  transform: none;
}`;
}
function createScript() {
	return `function expandGroup(group) {
  const trigger = group.querySelector('button')
  trigger.setAttribute('aria-expanded', 'true')

  const samp = group.querySelector('samp')
  samp.removeAttribute('hidden')
}

function collapseGroup(group) {
  const trigger = group.querySelector('button')
  trigger.removeAttribute('aria-expanded', 'true')

  const samp = group.querySelector('samp')
  samp.setAttribute('hidden', 'true')
}

function dumperActivate(dumpId, expand) {
  if (expand === true) {
    expandGroup(document.querySelector(\`#\${dumpId} .dumper-group\`))
  } else if (expand === 'all') {
    document.querySelectorAll(\`#\${dumpId} .dumper-group\`).forEach((c) => expandGroup(c))
  }

  document.querySelectorAll(\`#\${dumpId} .dumper-toggle\`).forEach((trigger) => {
    trigger.addEventListener('click', function (event) {
      const target = event.currentTarget
      const parent = target.parentElement
      const isExpanded = !!target.getAttribute('aria-expanded')

      if (isExpanded) {
        collapseGroup(parent)
        if (event.metaKey) {
          parent.querySelectorAll('.dumper-group').forEach((c) => collapseGroup(c))
        }
      } else {
        expandGroup(parent)
        if (event.metaKey) {
          parent.querySelectorAll('.dumper-group').forEach((c) => expandGroup(c))
        }
      }
    })
  })
}`;
}
function dump$1(value, config) {
	const parser = new Parser(config);
	parser.parse(value);
	return new HTMLFormatter(config).format(parser.flush());
}
var themes$1, dropdownIcon, HTMLPrinters, seed, nanoid, HTMLFormatter;
var init_main$1 = __esmMin((() => {
	init_chunk_26HALFTP();
	themes$1 = {
		nightOwl: {
			pre: "background-color: #061626; color: #c792ea;",
			toggle: "color: #4f5357; background: none; border: none;",
			braces: "color: #ffd700;",
			brackets: "color: #ffd700;",
			number: "color: #f78c6c;",
			bigInt: "color: #f78c6c; font-weight: bold;",
			boolean: "color: #ff5874; font-style: italic;",
			string: "color: #ecc48d;",
			null: "color: #637777;",
			undefined: "color: #637777;",
			prototypeLabel: "color: #637777;",
			symbol: "color: #82aaff;",
			regex: "color: #ff5874;",
			date: "color: #7fdbca;",
			buffer: "color: #7fdbca;",
			functionLabel: "color: #89b4fa;",
			arrayLabel: "color: #82aaff;",
			objectLabel: "color: #82aaff;",
			mapLabel: "color: #82aaff;",
			setLabel: "color: #82aaff;",
			objectKey: "color: #c792ea;",
			objectKeyPrefix: "color: #637777; font-style: italic; font-weight: bold",
			classLabel: "color: #82aaff;",
			collapseLabel: "color: #7fdbca; font-style: italic;",
			getterLabel: "color: #7fdbca;",
			circularLabel: "color: #7fdbca;",
			weakSetLabel: "color: #7fdbca;",
			weakRefLabel: "color: #7fdbca;",
			weakMapLabel: "color: #7fdbca;",
			observableLabel: "color: #7fdbca;",
			promiseLabel: "color: #7fdbca;",
			generatorLabel: "color: #7fdbca;",
			blobLabel: "color: #7fdbca;",
			unknownLabel: "color: #7fdbca;"
		},
		minLight: {
			pre: "background-color: #fff; color: #212121;",
			toggle: "color: #989999; background: none; border: none;",
			braces: "color: #0431fa;",
			brackets: "color: #0431fa;",
			number: "color: #1976d2;",
			bigInt: "color: #1976d2; font-weight: bold;",
			boolean: "color: #1976d2; font-style: italic;",
			string: "color: #22863a;",
			null: "color: #9c9c9d;",
			undefined: "color: #9c9c9d;",
			prototypeLabel: "color: #9c9c9d;",
			symbol: "color: #d32f2f;",
			regex: "color: #1976d2;",
			date: "color: #7b3814;",
			buffer: "color: #7b3814;",
			functionLabel: "color: #6f42c1;",
			arrayLabel: "color: #d32f2f;",
			objectLabel: "color: #d32f2f;",
			mapLabel: "color: #d32f2f;",
			setLabel: "color: #d32f2f;",
			objectKey: "color: #212121;",
			objectKeyPrefix: "color: #9c9c9d; font-style: italic; font-weight: bold",
			classLabel: "color: #6f42c1;",
			collapseLabel: "color: #9c9c9d; font-style: italic;",
			getterLabel: "color: #7b3814;",
			circularLabel: "color: #7b3814;",
			weakSetLabel: "color: #7b3814;",
			weakRefLabel: "color: #7b3814;",
			weakMapLabel: "color: #7b3814;",
			observableLabel: "color: #7b3814;",
			promiseLabel: "color: #7b3814;",
			generatorLabel: "color: #7b3814;",
			blobLabel: "color: #7b3814;",
			unknownLabel: "color: #7b3814;"
		},
		catppuccin: {
			pre: "background-color: #1e1e2e; color: #94e2d5;",
			toggle: "color: #7c7c8c; background: none; border: none;",
			braces: "color: #f38ba8;",
			brackets: "color: #f38ba8;",
			number: "color: #fab387;",
			bigInt: "color: #fab387; font-weight: bold;",
			boolean: "color: #cba6f7; font-style: italic;",
			string: "color: #a6e3a1;",
			null: "color: #6c7086;",
			undefined: "color: #6c7086;",
			prototypeLabel: "color: #6c7086;",
			symbol: "color: #f9e2af;",
			regex: "color: #cba6f7;",
			date: "color: #94e2d5;",
			buffer: "color: #94e2d5;",
			functionLabel: "color: #cba6f7;",
			arrayLabel: "color: #f9e2af;",
			objectLabel: "color: #f9e2af;",
			mapLabel: "color: #f9e2af;",
			setLabel: "color: #f9e2af;",
			objectKey: "color: #89b4fa;",
			objectKeyPrefix: "color: #6c7086; font-style: italic; font-weight: bold",
			classLabel: "color: #cba6f7;",
			collapseLabel: "color: #6c7086; font-style: italic;",
			getterLabel: "color: #94e2d5;",
			circularLabel: "color: #94e2d5;",
			weakSetLabel: "color: #94e2d5;",
			weakRefLabel: "color: #94e2d5;",
			weakMapLabel: "color: #94e2d5;",
			observableLabel: "color: #94e2d5;",
			promiseLabel: "color: #94e2d5;",
			generatorLabel: "color: #94e2d5;",
			blobLabel: "color: #94e2d5;",
			unknownLabel: "color: #94e2d5;"
		},
		/**
		* Following is the list of defined variables
		--pre-bg-color
		--pre-fg-color
		--toggle-fg-color
		--braces-fg-color
		--brackets-fg-color
		--dt-number-fg-color
		--dt-bigint-fg-color
		--dt-boolean-fg-color
		--dt-string-fg-color
		--dt-null-fg-color
		--dt-undefined-fg-color
		--prototype-label-fg-color
		--dt-symbol-fg-color
		--dt-regex-fg-color
		--dt-date-fg-color
		--dt-buffer-fg-color
		--function-label-fg-color
		--array-label-fg-color
		--object-label-fg-color
		--map-label-fg-color
		--set-label-fg-color
		--object-key-fg-color
		--object-key-prefix-fg-color
		--class-label-fg-color
		--collpase-label-fg-color
		--getter-label-fg-color
		--circular-label-fg-color
		--weakset-label-fg-color
		--weakref-label-fg-color
		--weakmap-label-fg-color
		--observable-label-fg-color
		--promise-label-fg-color
		--generator-label-fg-color
		--blob-label-fg-color
		--unknown-label-fg-color
		*/
		cssVariables: {
			pre: "background-color: var(--pre-bg-color); color: var(--pre-fg-color);",
			toggle: "color: var(--toggle-fg-color); background: none; border: none;",
			braces: "color: var(--braces-fg-color);",
			brackets: "color: var(--brackets-fg-color);",
			number: "color: var(--dt-number-fg-color);",
			bigInt: "color: var(--dt-bigint-fg-color); font-weight: bold;",
			boolean: "color: var(--dt-boolean-fg-color); font-style: italic;",
			string: "color: var(--dt-string-fg-color);",
			null: "color: var(--dt-null-fg-color);",
			undefined: "color: var(--dt-undefined-fg-color);",
			prototypeLabel: "color: var(--prototype-label-fg-color);",
			symbol: "color: var(--dt-symbol-fg-color);",
			regex: "color: var(--dt-regex-fg-color);",
			date: "color: var(--dt-date-fg-color);",
			buffer: "color: var(--dt-buffer-fg-color);",
			functionLabel: "color: var(--function-label-fg-color);",
			arrayLabel: "color: var(--array-label-fg-color);",
			objectLabel: "color: var(--object-label-fg-color);",
			mapLabel: "color: var(--map-label-fg-color);",
			setLabel: "color: var(--set-label-fg-color);",
			objectKey: "color: var(--object-key-fg-color);",
			objectKeyPrefix: "color: var(--object-key-prefix-fg-color); font-style: italic; font-weight: bold",
			classLabel: "color: var(--class-label-fg-color);",
			collapseLabel: "color: var(--collpase-label-fg-color); font-style: italic;",
			getterLabel: "color: var(--getter-label-fg-color);",
			circularLabel: "color: var(--circular-label-fg-color);",
			weakSetLabel: "color: var(--weakset-label-fg-color);",
			weakRefLabel: "color: var(--weakref-label-fg-color);",
			weakMapLabel: "color: var(--weakmap-label-fg-color);",
			observableLabel: "color: var(--observable-label-fg-color);",
			promiseLabel: "color: var(--promise-label-fg-color);",
			generatorLabel: "color: var(--generator-label-fg-color);",
			blobLabel: "color: var(--blob-label-fg-color);",
			unknownLabel: "color: var(--unknown-label-fg-color);"
		}
	};
	dropdownIcon = "&#9660;";
	HTMLPrinters = {
		"collapse": (token, formatter) => {
			const styles = token.token.type === "object-start" ? formatter.styles.objectLabel : formatter.styles.arrayLabel;
			const collpaseStyles = formatter.styles.collapseLabel;
			return `<span style="${styles}">${token.name}</span> ` + (token.token.type === "object-start" ? openingBrace$1(formatter) : openingBrackets$1(formatter)) + ` <span style="${collpaseStyles}">collapsed</span> ` + (token.token.type === "object-start" ? closingBrace$1(formatter) : closingBrackets$1(formatter));
		},
		"object-start": (token, formatter) => {
			formatter.indentation.increment();
			const styles = formatter.styles.objectLabel;
			const toggleStyles = formatter.styles.toggle;
			return `<span class="dumper-group dumper-object-group"><span style="${styles}">${formatter.context.isStaticMember && formatter.context.staticDepth === 0 ? " " : `${token.constructorName || "Object [null]"} `}</span>` + openingBrace$1(formatter) + `<button class="dumper-toggle" style="${toggleStyles}"><span>${dropdownIcon}</span></button><samp hidden="true">`;
		},
		"object-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}</samp>` + closingBrace$1(formatter) + "</span>";
		},
		"object-key": (token, formatter) => {
			formatter.context.isStack = token.value === "stack";
			const styles = formatter.styles.objectKey;
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			let value = token.value;
			if (token.isSymbol) value = `[${value}]`;
			else if (!/^[a-z$_][$\w]*$/i.test(value)) value = `"${htmlEscape(value.replace(/"/g, "\\\""))}"`;
			let prefix = "";
			if (formatter.context.isStaticMember) {
				formatter.context.staticDepth++;
				if (formatter.context.staticDepth === 1) prefix = `<span class="dumper-object-prefix" style="${formatter.styles.objectKeyPrefix}">static </span>`;
			}
			return indent + prefix + `<span class="dumper-object-key" style="${styles}">${value}</span>: `;
		},
		"object-circular-ref": (_, formatter) => {
			return `<span style="${formatter.styles.circularLabel}">[*Circular]</span>`;
		},
		"object-max-depth-ref": (_, formatter) => {
			return `<span style="${formatter.styles.objectLabel}">[Object]</span>`;
		},
		"object-value-getter": (_, formatter) => {
			return `<span style="${formatter.styles.getterLabel}">[Getter]</span>`;
		},
		"object-value-start": () => {
			return "";
		},
		"object-value-end": (_, formatter) => {
			if (formatter.context.isStaticMember) formatter.context.staticDepth--;
			return `,`;
		},
		"array-start": (token, formatter) => {
			formatter.indentation.increment();
			const toggleStyles = formatter.styles.toggle;
			return `<span class="dumper-group dumper-array-group"><span style="${formatter.styles.arrayLabel}">${`${token.name}:${token.size} `}</span>` + openingBrackets$1(formatter) + `<button class="dumper-toggle" style="${toggleStyles}"><span>${dropdownIcon}</span></button><samp hidden="true">`;
		},
		"array-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}</samp>` + closingBrackets$1(formatter) + "</span>";
		},
		"array-value-start": (_, formatter) => {
			return `${formatter.newLine}${formatter.indentation.getSpaces()}`;
		},
		"array-value-hole": (_, formatter) => {
			return `${formatter.newLine}${formatter.indentation.getSpaces()}<span class="dumper-undefined" style="${formatter.styles.undefined}">${htmlEscape("<hole>")},</span>`;
		},
		"array-value-end": () => {
			return `,`;
		},
		"array-circular-ref": (_, formatter) => {
			return `<span style="${formatter.styles.circularLabel}">[*Circular]</span>`;
		},
		"array-max-depth-ref": (_, formatter) => {
			return `<span style="${formatter.styles.arrayLabel}">[Array]</span>`;
		},
		"array-max-length-ref": (token, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			const styles = formatter.styles.arrayLabel;
			const itemsLeft = token.size - token.limit;
			if (itemsLeft <= 0) return "";
			return `${indent}<span style="${styles}">[...${itemsLeft === 1 ? `1 more item` : `${itemsLeft} more items`}]</span>`;
		},
		"prototype-start": (_, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			formatter.indentation.increment();
			const styles = formatter.styles.prototypeLabel;
			const toggleStyles = formatter.styles.toggle;
			return indent + `<span class="dumper-group dumper-prototype-group"><span style="${styles}">[[Prototype]] </span>` + openingBrace$1(formatter) + `<button class="dumper-toggle" style="${toggleStyles}"><span>${dropdownIcon}</span></button><samp hidden="true">`;
		},
		"prototype-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}</samp>` + closingBrace$1(formatter) + "</span>";
		},
		"map-start": (token, formatter) => {
			formatter.indentation.increment();
			const toggleStyles = formatter.styles.toggle;
			return `<span class="dumper-group dumper-map-group"><span style="${formatter.styles.mapLabel}">${`Map:${token.size} `}</span>` + openingBrace$1(formatter) + `<button class="dumper-toggle" style="${toggleStyles}"><span>${dropdownIcon}</span></button><samp hidden="true">`;
		},
		"map-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}</samp>` + closingBrace$1(formatter) + "</span>";
		},
		"map-row-start": (_, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			formatter.indentation.increment();
			return indent + openingBrackets$1(formatter);
		},
		"map-row-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + closingBrackets$1(formatter) + `,`;
		},
		"map-key-start": (_, formatter) => {
			const styles = formatter.styles.objectKey;
			return `${formatter.newLine}${formatter.indentation.getSpaces()}<span style="${styles}">key</span>: `;
		},
		"map-key-end": function() {
			return "";
		},
		"map-value-start": (_, formatter) => {
			const styles = formatter.styles.objectKey;
			return `${formatter.newLine}${formatter.indentation.getSpaces()}<span style="${styles}">value</span>: `;
		},
		"map-value-end": function() {
			return "";
		},
		"map-circular-ref": (_, formatter) => {
			return `${`${formatter.newLine}${formatter.indentation.getSpaces()}`}<span style="${formatter.styles.circularLabel}">[*Circular]</span>`;
		},
		"map-max-depth-ref": (_, formatter) => {
			return `<span style="${formatter.styles.mapLabel}">[Map]</span>`;
		},
		"map-max-length-ref": (token, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			const styles = formatter.styles.mapLabel;
			const itemsLeft = token.size - token.limit;
			if (itemsLeft <= 0) return "";
			return `${indent}<span style="${styles}">[...${itemsLeft === 1 ? `1 more item` : `${itemsLeft} more items`}]</span>`;
		},
		"set-start": (token, formatter) => {
			formatter.indentation.increment();
			const toggleStyles = formatter.styles.toggle;
			return `<span class="dumper-group dumper-set-group"><span class="dumper-set-label" style="${formatter.styles.setLabel}">${`Set:${token.size} `}</span>` + openingBrackets$1(formatter) + `<button class="dumper-toggle" style="${toggleStyles}"><span>${dropdownIcon}</span></button><samp hidden="true">`;
		},
		"set-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}</samp>` + closingBrackets$1(formatter) + "</span>";
		},
		"set-value-start": (_, formatter) => {
			return `${formatter.newLine}${formatter.indentation.getSpaces()}`;
		},
		"set-value-end": () => {
			return `,`;
		},
		"set-circular-ref": (_, formatter) => {
			return `<span style="${formatter.styles.circularLabel}">[*Circular]</span>`;
		},
		"set-max-depth-ref": (_, formatter) => {
			return `<span style="${formatter.styles.setLabel}">[Set]</span>`;
		},
		"set-max-length-ref": (token, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			const styles = formatter.styles.setLabel;
			const itemsLeft = token.size - token.limit;
			if (itemsLeft <= 0) return "";
			return `${indent}<span style="${styles}">[...${itemsLeft === 1 ? `1 more item` : `${itemsLeft} more items`}]</span>`;
		},
		"string": (token, formatter) => {
			let value = token.value;
			const indent = formatter.indentation.getSpaces();
			if (formatter.context.isStack) value = token.value.split("\n").map((row, index) => {
				let rowValue = `<span>${htmlEscape(row.trim())}</span>`;
				if (index > 0) rowValue = `${indent}${rowValue}`;
				return rowValue;
			}).join("\n");
			else value = wordWrap(token.value, {
				newLine: formatter.newLine,
				indent: formatter.indentation.getSpaces(),
				width: 70
			});
			return `<span class="dumper-string" style="${formatter.styles.string}">${value}</span>`;
		},
		"boolean": (token, formatter) => {
			return `<span class="dumper-boolean" style="${formatter.styles.boolean}">` + token.value + "</span>";
		},
		"number": (token, formatter) => {
			return `<span class="dumper-number" style="${formatter.styles.number}">` + token.value + "</span>";
		},
		"bigInt": (token, formatter) => {
			return `<span class="dumper-big-int" style="${formatter.styles.bigInt}">` + token.value + "</span>";
		},
		"undefined": (_, formatter) => {
			return `<span class="dumper-undefined" style="${formatter.styles.undefined}">undefined</span>`;
		},
		"null": (_, formatter) => {
			return `<span class="dumper-null" style="${formatter.styles.null}">null</span>`;
		},
		"symbol": (token, formatter) => {
			return `<span class="dumper-symbol" style="${formatter.styles.symbol}">` + token.value + "</span>";
		},
		"function": (token, formatter) => {
			const className = token.isClass ? "dumper-class" : "dumper-function";
			const styles = token.isClass ? formatter.styles.classLabel : formatter.styles.functionLabel;
			const async = token.isAsync ? `async ` : "";
			const generator = token.isGenerator ? `*` : "";
			const label = token.isClass ? `[class ${token.name}]` : `[${async}${generator}function ${token.name}]`;
			return `<span class="${className}" style="${styles}">` + label + "</span>";
		},
		"date": function(token, formatter) {
			return `<span class="dumper-date" style="${formatter.styles.date}">` + token.value + "</span>";
		},
		"buffer": function(token, formatter) {
			return `<span class="dumper-buffer" style="${formatter.styles.buffer}">` + htmlEscape(token.value) + "</span>";
		},
		"regexp": function(token, formatter) {
			return `<span class="dumper-regex" style="${formatter.styles.regex}">` + token.value + "</span>";
		},
		"unknown": function(token, formatter) {
			return `<span class="dumper-value-unknown" style="${formatter.styles.unknownLabel}">` + String(token.value) + "</span>";
		},
		"weak-set": function(_, formatter) {
			return `<span class="dumper-weak-set" style="${formatter.styles.weakSetLabel}">[WeakSet]</span>`;
		},
		"weak-ref": function(_, formatter) {
			return `<span class="dumper-weak-ref" style="${formatter.styles.weakRefLabel}">[WeakRef]</span>`;
		},
		"weak-map": function(_, formatter) {
			return `<span class="dumper-weak-map" style="${formatter.styles.weakMapLabel}">[WeakMap]</span>`;
		},
		"observable": function(_, formatter) {
			return `<span class="dumper-observable" style="${formatter.styles.observableLabel}">[Observable]</span>`;
		},
		"blob": function(token, formatter) {
			const styles = formatter.styles.objectLabel;
			const propertiesStart = `<span styles="${formatter.styles.braces}">{ `;
			const propertiesEnd = `<span styles="${formatter.styles.braces}"> }</span></span>`;
			const sizeProp = `<span styles="${formatter.styles.objectKey}">size: </span>`;
			const sizeValue = `<span styles="${formatter.styles.number}">${token.size}</span>,`;
			const typeProp = `<span styles="${formatter.styles.objectKey}">type: </span>`;
			const typeValue = `<span styles="${formatter.styles.string}">${token.contentType}</span>`;
			return `<span class="dumper-blob" style="${styles}">[Blob]` + propertiesStart + `${sizeProp}${sizeValue} ${typeProp}${typeValue}` + propertiesEnd + "</span>";
		},
		"promise": function(token, formatter) {
			return `<span class="dumper-promise" style="${formatter.styles.promiseLabel}">[Promise${htmlEscape(`<${token.isFulfilled ? "resolved" : "pending"}>`)}]</span>`;
		},
		"generator": function(token, formatter) {
			const styles = formatter.styles.generatorLabel;
			const label = token.isAsync ? "[AsyncGenerator] {}" : "[Generator] {}";
			return `<span class="dumper-generator" style="${styles}">` + label + "</span>";
		},
		"static-members-start": function(_, formatter) {
			formatter.context.isStaticMember = true;
			formatter.context.staticDepth = 0;
			return "";
		},
		"static-members-end": function(_, formatter) {
			formatter.context.isStaticMember = false;
			formatter.context.staticDepth = 0;
			return "";
		}
	};
	seed = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
	nanoid = (length = 15) => {
		let output = "";
		let random = new Uint8Array(length);
		if (globalThis.crypto) crypto.getRandomValues(random);
		else for (let i = 0; i < length; i++) random[i] = Math.floor(Math.random() * 256);
		for (let n = 0; n < length; n++) output += seed[63 & random[n]];
		return output;
	};
	HTMLFormatter = class {
		#config;
		/**
		* Styles for output elements
		*/
		styles;
		/**
		* Context maintained through out the printing
		* phase. Each instance has its own context
		* that gets mutated internally.
		*/
		context;
		/**
		* Value for the newline character
		*/
		newLine = "\n";
		/**
		* Utility to manage indentation
		*/
		indentation = {
			counter: 0,
			/**
			* Increment the identation by 1 step
			*/
			increment() {
				this.counter++;
			},
			/**
			* Decrement the identation by 1 step
			*/
			decrement() {
				this.counter--;
			},
			/**
			* Get the identation spaces as per the current
			* identation level
			*/
			getSpaces() {
				return new Array(this.counter * 2 + 1).join("&nbsp;");
			}
		};
		constructor(config, context) {
			this.context = context || {};
			this.#config = config || {};
			this.styles = Object.freeze({
				...themes$1.nightOwl,
				...config?.styles
			});
		}
		/**
		* Wraps the final output inside pre tags and add the script
		* to activate the frontend iteractions.
		*/
		#wrapOutput(code) {
			const id = `dump-${nanoid()}`;
			const expand = this.#config.expand === "all" ? `'all'` : this.#config.expand;
			const nonce = this.#config.cspNonce ? ` nonce="${this.#config.cspNonce}"` : "";
			return `<div id="${id}" class="dumper-dump"><pre style="${this.styles.pre}"><code>${code}</code></pre><script${nonce}>dumperActivate('${id}', ${expand})<\/script></div>`;
		}
		/**
		* Format a collection of tokens to HTML output wrapped
		* inside the `pre` tag.
		*/
		format(tokens) {
			return this.#wrapOutput(tokens.map((token) => {
				const formatter = HTMLPrinters[token.type];
				return formatter(token, this) || "";
			}).join(""));
		}
	};
}));
//#endregion
//#region node_modules/@poppinss/dumper/node_modules/supports-color/browser.js
var level, colorSupport, supportsColor;
var init_browser = __esmMin((() => {
	level = (() => {
		if (!("navigator" in globalThis)) return 0;
		if (globalThis.navigator.userAgentData) {
			if (navigator.userAgentData.brands.find(({ brand }) => brand === "Chromium")?.version > 93) return 3;
		}
		if (/\b(Chrome|Chromium)\//.test(globalThis.navigator.userAgent)) return 1;
		return 0;
	})();
	colorSupport = level !== 0 && {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
	supportsColor = {
		stdout: colorSupport,
		stderr: colorSupport
	};
}));
//#endregion
//#region node_modules/@poppinss/dumper/build/formatters/console/main.js
function openingBrace(formatter) {
	return formatter.styles.braces("{");
}
function closingBrace(formatter) {
	return formatter.styles.braces("}");
}
function openingBrackets(formatter) {
	return formatter.styles.brackets("[");
}
function closingBrackets(formatter) {
	return formatter.styles.brackets("]");
}
function dump(value, config) {
	const parser = new Parser(config);
	parser.parse(value);
	return new ConsoleFormatter(config).format(parser.flush());
}
var colors, themes, ConsolePrinters, ConsoleFormatter;
var init_main = __esmMin((() => {
	init_chunk_26HALFTP();
	init_build();
	init_browser();
	colors = supportsColor.stdout ? colors_default.ansi() : colors_default.silent();
	themes = { default: {
		braces: (value) => colors.yellow(value),
		brackets: (value) => colors.yellow(value),
		number: (value) => colors.yellow(value),
		bigInt: (value) => colors.yellow().bold(value),
		boolean: (value) => colors.yellow().italic(value),
		string: (value) => colors.green(value),
		null: (value) => colors.dim(value),
		undefined: (value) => colors.dim(value),
		prototypeLabel: (value) => colors.dim(value),
		symbol: (value) => colors.magenta(value),
		regex: (value) => colors.red(value),
		date: (value) => colors.magenta(value),
		buffer: (value) => colors.magenta(value),
		functionLabel: (value) => colors.cyan().italic(value),
		arrayLabel: (value) => colors.cyan(value),
		objectLabel: (value) => colors.cyan(value),
		mapLabel: (value) => colors.cyan(value),
		setLabel: (value) => colors.cyan(value),
		objectKey: (value) => colors.blue(value),
		objectKeyPrefix: (value) => colors.dim(value),
		classLabel: (value) => colors.cyan(value),
		weakSetLabel: (value) => colors.cyan(value),
		weakRefLabel: (value) => colors.cyan(value),
		collapseLabel: (value) => colors.dim(value),
		circularLabel: (value) => colors.cyan(value),
		getterLabel: (value) => colors.cyan(value),
		weakMapLabel: (value) => colors.cyan(value),
		observableLabel: (value) => colors.cyan(value),
		promiseLabel: (value) => colors.blue(value),
		generatorLabel: (value) => colors.cyan(value),
		blobLabel: (value) => colors.magenta(value),
		unknownLabel: (value) => colors.magenta(value)
	} };
	ConsolePrinters = {
		"collapse": (token, formatter) => {
			const styles = token.token.type === "object-start" ? formatter.styles.objectLabel : formatter.styles.arrayLabel;
			const collpaseStyles = formatter.styles.collapseLabel;
			return `${styles(token.name)} ` + (token.token.type === "object-start" ? openingBrace(formatter) : openingBrackets(formatter)) + ` ${collpaseStyles("collpased")} ` + (token.token.type === "object-start" ? closingBrace(formatter) : closingBrackets(formatter));
		},
		"object-start": (token, formatter) => {
			formatter.indentation.increment();
			const styles = formatter.styles.objectLabel;
			return (formatter.context.isStaticMember && formatter.context.staticDepth === 0 || token.constructorName === "Object" ? "" : styles(`${token.constructorName || "Object [null]"}`) + " ") + openingBrace(formatter);
		},
		"object-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + closingBrace(formatter);
		},
		"object-key": (token, formatter) => {
			formatter.context.isStack = token.value === "stack";
			const styles = formatter.styles.objectKey;
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			let value = token.value;
			if (token.isSymbol) value = `[${value}]`;
			let prefix = "";
			if (formatter.context.isStaticMember) {
				formatter.context.staticDepth++;
				if (formatter.context.staticDepth === 1) {
					const prefixStyles = formatter.styles.objectKeyPrefix;
					prefix = `${prefixStyles("static")} `;
				}
			}
			return indent + prefix + styles(value) + ": ";
		},
		"object-circular-ref": (_, formatter) => {
			const styles = formatter.styles.circularLabel;
			return styles("[*Circular]");
		},
		"object-max-depth-ref": (_, formatter) => {
			const styles = formatter.styles.objectLabel;
			return styles("[Object]");
		},
		"object-value-getter": (_, formatter) => {
			const styles = formatter.styles.getterLabel;
			return styles("[Getter]");
		},
		"object-value-start": () => {
			return "";
		},
		"object-value-end": (_, formatter) => {
			if (formatter.context.isStaticMember) formatter.context.staticDepth--;
			return `,`;
		},
		"array-start": (token, formatter) => {
			formatter.indentation.increment();
			const styles = formatter.styles.arrayLabel;
			return (token.name !== "Array" ? styles(`${token.name}`) + " " : "") + openingBrackets(formatter);
		},
		"array-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + closingBrackets(formatter);
		},
		"array-value-start": (_, formatter) => {
			return `${formatter.newLine}${formatter.indentation.getSpaces()}`;
		},
		"array-value-hole": (_, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			const styles = formatter.styles.undefined;
			return indent + styles("<hole>") + ",";
		},
		"array-value-end": () => {
			return `,`;
		},
		"array-circular-ref": (_, formatter) => {
			const styles = formatter.styles.circularLabel;
			return styles("[*Circular]");
		},
		"array-max-depth-ref": (_, formatter) => {
			const styles = formatter.styles.arrayLabel;
			return styles("[Array]");
		},
		"array-max-length-ref": (token, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			const styles = formatter.styles.arrayLabel;
			const itemsLeft = token.size - token.limit;
			if (itemsLeft <= 0) return "";
			return indent + styles(`[...${itemsLeft === 1 ? `1 more item` : `${itemsLeft} more items`}]`);
		},
		"prototype-start": (_, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			formatter.indentation.increment();
			const styles = formatter.styles.prototypeLabel;
			return indent + styles("[[Prototype]] ") + openingBrace(formatter);
		},
		"prototype-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + closingBrace(formatter);
		},
		"map-start": (token, formatter) => {
			formatter.indentation.increment();
			const styles = formatter.styles.mapLabel;
			return styles(`Map(${token.size}) `) + openingBrace(formatter);
		},
		"map-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + closingBrace(formatter);
		},
		"map-row-start": (_, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			formatter.indentation.increment();
			return indent + openingBrackets(formatter);
		},
		"map-row-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + closingBrackets(formatter) + `,`;
		},
		"map-key-start": (_, formatter) => {
			const styles = formatter.styles.objectKey;
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + styles("key") + ": ";
		},
		"map-key-end": function() {
			return ",";
		},
		"map-value-start": (_, formatter) => {
			const styles = formatter.styles.objectKey;
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + styles("value") + ": ";
		},
		"map-value-end": function() {
			return ",";
		},
		"map-circular-ref": (_, formatter) => {
			const styles = formatter.styles.circularLabel;
			return styles("[*Circular]");
		},
		"map-max-depth-ref": (_, formatter) => {
			const styles = formatter.styles.mapLabel;
			return styles("[Map]");
		},
		"map-max-length-ref": (token, formatter) => {
			const styles = formatter.styles.mapLabel;
			const itemsLeft = token.size - token.limit;
			if (itemsLeft <= 0) return "";
			return styles(`[...${itemsLeft === 1 ? `1 more item` : `${itemsLeft} more items`}]`);
		},
		"set-start": (token, formatter) => {
			formatter.indentation.increment();
			const styles = formatter.styles.setLabel;
			return styles(`Set(${token.size}) `) + openingBrackets(formatter);
		},
		"set-end": (_, formatter) => {
			formatter.indentation.decrement();
			return `${formatter.newLine}${formatter.indentation.getSpaces()}` + closingBrackets(formatter);
		},
		"set-value-start": (_, formatter) => {
			return `${formatter.newLine}${formatter.indentation.getSpaces()}`;
		},
		"set-value-end": () => {
			return `,`;
		},
		"set-circular-ref": (_, formatter) => {
			const styles = formatter.styles.circularLabel;
			return styles("[*Circular]");
		},
		"set-max-depth-ref": (_, formatter) => {
			const styles = formatter.styles.setLabel;
			return styles("[Set]");
		},
		"set-max-length-ref": (token, formatter) => {
			const indent = `${formatter.newLine}${formatter.indentation.getSpaces()}`;
			const styles = formatter.styles.setLabel;
			const itemsLeft = token.size - token.limit;
			if (itemsLeft <= 0) return "";
			return indent + styles(`[...${itemsLeft === 1 ? `1 more item` : `${itemsLeft} more items`}]`);
		},
		"string": (token, formatter) => {
			let value = token.value;
			const indent = formatter.indentation.getSpaces();
			if (formatter.context.isStack) value = token.value.split("\n").map((row, index) => {
				let rowValue = row.trim();
				if (index > 0) rowValue = `${indent}${rowValue}`;
				return rowValue;
			}).join("\n");
			else value = wordWrap(token.value, {
				newLine: formatter.newLine,
				indent: formatter.indentation.getSpaces(),
				width: 70,
				escape: (line) => line
			});
			const styles = formatter.styles.string;
			return styles(value);
		},
		"boolean": (token, formatter) => {
			const styles = formatter.styles.boolean;
			return styles(String(token.value));
		},
		"number": (token, formatter) => {
			const styles = formatter.styles.number;
			return styles(String(token.value));
		},
		"bigInt": (token, formatter) => {
			const styles = formatter.styles.bigInt;
			return styles(token.value);
		},
		"undefined": (_, formatter) => {
			const styles = formatter.styles.undefined;
			return styles("undefined");
		},
		"null": (_, formatter) => {
			const styles = formatter.styles.null;
			return styles("null");
		},
		"symbol": (token, formatter) => {
			const styles = formatter.styles.symbol;
			return styles(token.value);
		},
		"function": (token, formatter) => {
			const styles = token.isClass ? formatter.styles.classLabel : formatter.styles.functionLabel;
			const async = token.isAsync ? `async ` : "";
			const generator = token.isGenerator ? `*` : "";
			return styles(token.isClass ? `[class ${token.name}]` : `[${async}${generator}function ${token.name}]`);
		},
		"date": function(token, formatter) {
			const styles = formatter.styles.date;
			return styles(token.value);
		},
		"buffer": function(token, formatter) {
			const styles = formatter.styles.buffer;
			return styles(token.value);
		},
		"regexp": function(token, formatter) {
			const styles = formatter.styles.regex;
			return styles(token.value);
		},
		"unknown": function(token, formatter) {
			const styles = formatter.styles.unknownLabel;
			return styles(String(token.value));
		},
		"weak-set": function(_, formatter) {
			const styles = formatter.styles.weakSetLabel;
			return styles("[WeakSet]");
		},
		"weak-ref": function(_, formatter) {
			const styles = formatter.styles.weakRefLabel;
			return styles("[WeakRef]");
		},
		"weak-map": function(_, formatter) {
			const styles = formatter.styles.weakMapLabel;
			return styles("[WeakMap]");
		},
		"observable": function(_, formatter) {
			const styles = formatter.styles.observableLabel;
			return styles("[Observable]");
		},
		"blob": function(token, formatter) {
			const styles = formatter.styles.objectLabel;
			const sizeProp = formatter.styles.objectKey("size: ");
			const sizeValue = formatter.styles.number(`${token.size}`);
			const typeProp = token.contentType ? `, ${formatter.styles.objectKey("type: ")}` : "";
			const typeValue = token.contentType ? formatter.styles.string(`${token.contentType}`) : "";
			return styles("[Blob]") + " " + openingBrace(formatter) + `${sizeProp}${sizeValue}${typeProp}${typeValue}` + closingBrace(formatter);
		},
		"promise": function(token, formatter) {
			const styles = formatter.styles.promiseLabel;
			return styles(`[Promise${`<${token.isFulfilled ? "resolved" : "pending"}>`}]`);
		},
		"generator": function(token, formatter) {
			const styles = formatter.styles.generatorLabel;
			return styles(token.isAsync ? "[AsyncGenerator] {}" : "[Generator] {}");
		},
		"static-members-start": function(_, formatter) {
			formatter.context.isStaticMember = true;
			formatter.context.staticDepth = 0;
			return " ";
		},
		"static-members-end": function(_, formatter) {
			formatter.context.isStaticMember = false;
			formatter.context.staticDepth = 0;
			return "";
		}
	};
	ConsoleFormatter = class {
		/**
		* Styles for output elements
		*/
		styles;
		/**
		* Context maintained through out the printing
		* phase. Each instance has its own context
		* that gets mutated internally.
		*/
		context;
		/**
		* Value for the newline character
		*/
		newLine = "\n";
		/**
		* Utility to manage indentation
		*/
		indentation = {
			counter: 0,
			/**
			* Increment the identation by 1 step
			*/
			increment() {
				this.counter++;
			},
			/**
			* Decrement the identation by 1 step
			*/
			decrement() {
				this.counter--;
			},
			/**
			* Get the identation spaces as per the current
			* identation level
			*/
			getSpaces() {
				return new Array(this.counter * 2 + 1).join(" ");
			}
		};
		constructor(config, context) {
			this.context = context || {};
			this.styles = Object.freeze({
				...themes.default,
				...config?.styles
			});
		}
		/**
		* Format a collection of tokens to ANSI output
		*/
		format(tokens) {
			return tokens.map((token) => {
				const formatter = ConsolePrinters[token.type];
				return formatter(token, this) || "";
			}).join("");
		}
	};
}));
//#endregion
export { dump$1 as a, createStyleSheet as i, init_main as n, init_main$1 as o, createScript as r, themes$1 as s, dump as t };
