import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { analyzeMood } from "@/lib/mood.functions";
import { addEntry, setCurrent, type MoodEntry } from "@/lib/mood-storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mood Diary — How are you feeling today?" },
      { name: "description", content: "A cute personal AI mood diary." },
    ],
  }),
  component: Home,
});

function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const analyze = useServerFn(analyzeMood);

  const MAX = 280;
  const remaining = text.length;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyze({ data: { text: text.trim() } });
      const entry: MoodEntry = {
        ...result,
        id: crypto.randomUUID(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };
      addEntry(entry);
      setCurrent(entry);
      navigate({ to: "/result" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-diary-gradient px-5 py-10 flex flex-col">
      <header className="flex items-center justify-between mb-8 max-w-md mx-auto w-full">
        <div className="text-2xl">💗</div>
        <Link
          to="/history"
          className="text-sm text-diary-ink/70 hover:text-diary-ink transition-colors font-medium"
        >
          History
        </Link>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full flex flex-col justify-center">
        <h1 className="text-3xl font-semibold text-diary-ink text-center leading-snug">
          How are you feeling today? 💗
        </h1>
        <p className="text-center text-diary-ink/60 mt-3 text-sm">
          Write it out — I'll listen.
        </p>

        <form onSubmit={onSubmit} className="mt-8">
          <div className="bg-white/70 backdrop-blur rounded-3xl p-5 shadow-diary-soft border border-white">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              placeholder="Today I feel…"
              rows={6}
              maxLength={MAX}
              className="w-full resize-none bg-transparent outline-none text-diary-ink placeholder:text-diary-ink/30 text-lg leading-relaxed"
            />
            <div className="flex justify-end text-xs text-diary-ink/40 mt-2">
              {remaining}/{MAX}
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-center text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={!text.trim() || loading}
            className="mt-6 w-full rounded-full bg-diary-pink text-white font-semibold py-4 text-base shadow-diary-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Feeling it out…" : "Analyze My Mood ✨"}
          </button>
        </form>
      </main>
    </div>
  );
}
