import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { analyzeMood, saveMoodEntry, type MoodEntry } from "@/lib/mood.functions";
import { setCurrent } from "@/lib/mood-storage";
import { requireAuth } from "@/lib/require-auth";
import { nanoid } from "nanoid";
import { logout } from "@/lib/auth.functions";

export const Route = createFileRoute("/")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [
      { title: "Mood Diary — How is Eun feeling today?" },
      { name: "description", content: "A cute personal AI mood diary just for Eun." },
    ],
  }),
  component: Home,
});

async function handleLogout() {
  await logout();
  window.location.href = "/login"; // or wherever your login page lives
}

function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const analyze = useServerFn(analyzeMood);
  const save = useServerFn(saveMoodEntry);

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
        id: nanoid(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };
      await save({ data: entry });
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
          How is Eun feeling today? 💗
        </h1>
        <p className="text-center text-diary-ink/60 mt-3 text-sm">
          Write it out — I'll listen babe.
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
            {loading ? "Feeling it out…" : "Analyze Eun's Mood ✨"}
          </button>
        </form>
        <button 
          type="submit"
          className="mt-6 w-full rounded-full bg-white text-diary-pink font-semibold py-4 text-base shadow-diary-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          
          onClick={handleLogout}>Log out</button>
      </main>
    </div>
  );
}
