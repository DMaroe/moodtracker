import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({ text: z.string().min(1).max(280) });

const MoodSchema = z.object({
  score: z.number().min(0).max(100),
  mood: z.string(),
  emoji: z.string(),
  summary: z.string(),
});

export type MoodResult = z.infer<typeof MoodSchema>;

export const analyzeMood = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<MoodResult> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a warm, gentle emotional-reflection companion for a personal mood journal. Analyze the user's journal entry and return ONLY a JSON object with keys: score (0-100 integer, higher = more positive), mood (single word like Happy, Sad, Anxious, Calm, Excited, Tired, Loved), emoji (one emoji matching the mood), summary (1-2 short warm sentences reflecting the feeling in second person, e.g. 'You seem...'). No medical advice. No extra prose, only JSON.",
          },
          { role: "user", content: data.text },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`AI gateway error ${res.status}: ${body}`);
    }
    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "{}";
    const parsed = MoodSchema.parse(JSON.parse(content));
    return parsed;
  });
