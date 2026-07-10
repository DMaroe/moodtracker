import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { n as createSsrRpc } from "./auth.functions-C9tHsZw-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mood.functions-1ScI9ZIH.js
var Input = objectType({ text: stringType().min(1).max(280) });
var analyzeMood = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("cf44db3b26cb418d684ada8bac31e647ad82afea844ef1a688ce92d4fbe261d4"));
var listMoodEntries = createServerFn({ method: "GET" }).handler(createSsrRpc("f2c4037bda4ef45327dd656edd161462d1ea4919da6f14e642db817872fd062f"));
var SaveEntryInput = objectType({
	id: stringType().min(1),
	text: stringType().min(1).max(280),
	score: numberType().min(0).max(100),
	mood: stringType(),
	emoji: stringType(),
	summary: stringType(),
	createdAt: stringType()
});
var saveMoodEntry = createServerFn({ method: "POST" }).inputValidator((data) => SaveEntryInput.parse(data)).handler(createSsrRpc("27384186f0a56f6a847572e12cbbb3c4101cbf121f80f2f426ab16ca0f9b17f2"));
//#endregion
export { listMoodEntries as n, saveMoodEntry as r, analyzeMood as t };
