import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { n as createSsrRpc } from "./auth.functions-xWviLBsq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mood.functions-0eRV5oU9.js
var MAX_WORDS = 5e3;
function countWords(text) {
	const trimmed = text.trim();
	if (!trimmed) return 0;
	return trimmed.split(/\s+/).length;
}
var Input = objectType({ text: stringType().min(1).refine((val) => countWords(val) <= MAX_WORDS, { message: `Entry must be ${MAX_WORDS} words or fewer` }) });
var analyzeMood = createServerFn({ method: "POST" }).validator((data) => Input.parse(data)).handler(createSsrRpc("cf44db3b26cb418d684ada8bac31e647ad82afea844ef1a688ce92d4fbe261d4"));
var listMoodEntries = createServerFn({ method: "GET" }).handler(createSsrRpc("f2c4037bda4ef45327dd656edd161462d1ea4919da6f14e642db817872fd062f"));
var SaveEntryInput = objectType({
	id: stringType().min(1),
	text: stringType().min(1).refine((val) => countWords(val) <= MAX_WORDS, { message: `Entry must be ${MAX_WORDS} words or fewer` }),
	score: numberType().min(0).max(100),
	mood: stringType(),
	emoji: stringType(),
	summary: stringType(),
	createdAt: stringType()
});
var saveMoodEntry = createServerFn({ method: "POST" }).validator((data) => SaveEntryInput.parse(data)).handler(createSsrRpc("27384186f0a56f6a847572e12cbbb3c4101cbf121f80f2f426ab16ca0f9b17f2"));
//#endregion
export { listMoodEntries as n, saveMoodEntry as r, analyzeMood as t };
