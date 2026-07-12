import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { requireAuthServer } from "@/lib/auth.functions";
import { getRequest } from "@tanstack/react-start/server";
const MAX_WORDS = 5000;

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

const Input = z.object({
  text: z
    .string()
    .min(1)
    .refine((val) => countWords(val) <= MAX_WORDS, {
      message: `Entry must be ${MAX_WORDS} words or fewer`,
    }),
});

const MoodSchema = z.object({
  score: z.number().min(0).max(100),
  mood: z.string(),
  emoji: z.string(),
  summary: z.string(),
});

export type MoodResult = z.infer<typeof MoodSchema>;

export type MoodEntry = MoodResult & {
  id: string;
  text: string;
  createdAt: string;
};

function getOpenAIKey(): string {
  const event = getRequest();

  if (!event) {
    throw new Error("No request context available");
  }

  const ctx = event.context as any;

  const key =
    ctx?.cloudflare?.env?.OPENAI_API_KEY ||
    ctx?.env?.OPENAI_API_KEY ||
    globalThis?.__env__?.OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY;

  if (!key) {
    console.error("Available context:", JSON.stringify(ctx, null, 2));
    throw new Error(
      "OPENAI_API_KEY secret missing. Check Cloudflare Worker secret binding."
    );
  }

  return key;
}

export const analyzeMood = createServerFn({ method: "POST" })
  .validator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<MoodResult> => {
    requireAuthServer();
    const key = getOpenAIKey();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a warm, gentle emotional-reflection companion for a personal mood journal. Analyze the user's journal entry and return ONLY a JSON object with keys: score (0-100 integer, higher = more positive), mood (single word like Happy, Sad, Anxious, Calm, Excited, Tired, Loved), emoji (one emoji matching the mood), summary (1-2 short warm sentences reflecting the feeling in second person, e.g. 'You seem...'). The summary MUST be 50 words or fewer, no matter how long the journal entry is. No medical advice. No extra prose, only JSON.",
          },
          { role: "user", content: data.text },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`OpenAI API error ${res.status}: ${body}`);
    }
    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "{}";
    const parsed = MoodSchema.parse(JSON.parse(content));

    // Safety net: guarantee the summary is at most 50 words even if the
    // model doesn't follow the instruction.
    const summaryWords = parsed.summary.trim().split(/\s+/);
    if (summaryWords.length > 50) {
      parsed.summary = summaryWords.slice(0, 50).join(" ") + "…";
    }

    return parsed;
  });

export const listMoodEntries = createServerFn({ method: "GET" }).handler(
  async (): Promise<MoodEntry[]> => {
    requireAuthServer();
    const db = await getDb();
    const { results } = await db
      .prepare(
        "SELECT id, text, score, mood, emoji, summary, created_at as createdAt FROM mood_entries ORDER BY created_at DESC LIMIT 100",
      )
      .all<MoodEntry>();
    return results;
  },
);

const SaveEntryInput = z.object({
  id: z.string().min(1),
  text: z
    .string()
    .min(1)
    .refine((val) => countWords(val) <= MAX_WORDS, {
      message: `Entry must be ${MAX_WORDS} words or fewer`,
    }),
  score: z.number().min(0).max(100),
  mood: z.string(),
  emoji: z.string(),
  summary: z.string(),
  createdAt: z.string(),
});

export const saveMoodEntry = createServerFn({ method: "POST" })
  .validator((data: unknown) => SaveEntryInput.parse(data))
  .handler(async ({ data }) => {
    requireAuthServer();
    const db = await getDb();
    await db
      .prepare(
        "INSERT INTO mood_entries (id, text, score, mood, emoji, summary, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(data.id, data.text, data.score, data.mood, data.emoji, data.summary, data.createdAt)
      .run();
    return { ok: true };
  });