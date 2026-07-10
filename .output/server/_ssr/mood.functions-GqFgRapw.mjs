import { o as __toESM } from "../_runtime.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { i as requireAuthServer } from "./auth.functions-C9tHsZw-.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/mood.functions-GqFgRapw.js
import("../_libs/wrangler.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
async function getDb() {
	const env = globalThis.__env__;
	if (!env?.DB) throw new Error("D1 binding 'DB' not found. Check that wrangler.jsonc has a d1_databases entry named DB.");
	return env.DB;
}
var Input = objectType({ text: stringType().min(1).max(280) });
var MoodSchema = objectType({
	score: numberType().min(0).max(100),
	mood: stringType(),
	emoji: stringType(),
	summary: stringType()
});
var analyzeMood_createServerFn_handler = createServerRpc({
	id: "cf44db3b26cb418d684ada8bac31e647ad82afea844ef1a688ce92d4fbe261d4",
	name: "analyzeMood",
	filename: "src/lib/mood.functions.ts"
}, (opts) => analyzeMood.__executeServer(opts));
var analyzeMood = createServerFn({ method: "POST" }).inputValidator((data) => Input.parse(data)).handler(analyzeMood_createServerFn_handler, async ({ data }) => {
	requireAuthServer();
	const key = processModule.env.OPENAI_API_KEY;
	if (!key) throw new Error("Missing OPENAI_API_KEY");
	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`
		},
		body: JSON.stringify({
			model: "gpt-4o-mini",
			messages: [{
				role: "system",
				content: "You are a warm, gentle emotional-reflection companion for a personal mood journal. Analyze the user's journal entry and return ONLY a JSON object with keys: score (0-100 integer, higher = more positive), mood (single word like Happy, Sad, Anxious, Calm, Excited, Tired, Loved), emoji (one emoji matching the mood), summary (1-2 short warm sentences reflecting the feeling in second person, e.g. 'You seem...'). No medical advice. No extra prose, only JSON."
			}, {
				role: "user",
				content: data.text
			}],
			response_format: { type: "json_object" }
		})
	});
	if (!res.ok) {
		const body = await res.text();
		throw new Error(`OpenAI API error ${res.status}: ${body}`);
	}
	const content = (await res.json()).choices?.[0]?.message?.content ?? "{}";
	return MoodSchema.parse(JSON.parse(content));
});
var listMoodEntries_createServerFn_handler = createServerRpc({
	id: "f2c4037bda4ef45327dd656edd161462d1ea4919da6f14e642db817872fd062f",
	name: "listMoodEntries",
	filename: "src/lib/mood.functions.ts"
}, (opts) => listMoodEntries.__executeServer(opts));
var listMoodEntries = createServerFn({ method: "GET" }).handler(listMoodEntries_createServerFn_handler, async () => {
	requireAuthServer();
	const { results } = await (await getDb()).prepare("SELECT id, text, score, mood, emoji, summary, created_at as createdAt FROM mood_entries ORDER BY created_at DESC LIMIT 100").all();
	return results;
});
var SaveEntryInput = objectType({
	id: stringType().min(1),
	text: stringType().min(1).max(280),
	score: numberType().min(0).max(100),
	mood: stringType(),
	emoji: stringType(),
	summary: stringType(),
	createdAt: stringType()
});
var saveMoodEntry_createServerFn_handler = createServerRpc({
	id: "27384186f0a56f6a847572e12cbbb3c4101cbf121f80f2f426ab16ca0f9b17f2",
	name: "saveMoodEntry",
	filename: "src/lib/mood.functions.ts"
}, (opts) => saveMoodEntry.__executeServer(opts));
var saveMoodEntry = createServerFn({ method: "POST" }).inputValidator((data) => SaveEntryInput.parse(data)).handler(saveMoodEntry_createServerFn_handler, async ({ data }) => {
	requireAuthServer();
	await (await getDb()).prepare("INSERT INTO mood_entries (id, text, score, mood, emoji, summary, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(data.id, data.text, data.score, data.mood, data.emoji, data.summary, data.createdAt).run();
	return { ok: true };
});
//#endregion
export { analyzeMood_createServerFn_handler, listMoodEntries_createServerFn_handler, saveMoodEntry_createServerFn_handler };
