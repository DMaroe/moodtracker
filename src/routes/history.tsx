import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { listMoodEntries, type MoodEntry } from "@/lib/mood.functions";
import { requireAuth } from "@/lib/require-auth";

export const Route = createFileRoute("/history")({
  beforeLoad: requireAuth,
  head: () => ({ meta: [{ title: "Mood History — Mood Diary" }] }),
  component: History,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
}

function History() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const list = useServerFn(listMoodEntries);

  useEffect(() => {
    list()
      .then(setEntries)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-diary-gradient px-5 py-10">
      <header className="max-w-md mx-auto w-full flex items-center justify-between mb-8">
        <Link to="/" className="text-sm text-diary-ink/70 hover:text-diary-ink font-medium">
          ← Back
        </Link>
        <div className="text-2xl">💗</div>
      </header>

      <main className="max-w-md mx-auto w-full">
        <h1 className="text-3xl font-semibold text-diary-ink">Your moods</h1>
        <p className="text-diary-ink/60 mt-2 text-sm">A little trail of how you've felt.</p>

        {loading ? (
          <div className="mt-12 text-center text-diary-ink/50 text-sm">Loading…</div>
        ) : entries.length === 0 ? (
          <div className="mt-12 text-center bg-white/70 backdrop-blur rounded-3xl p-8 shadow-diary-soft border border-white">
            <div className="text-5xl mb-4">🌸</div>
            <p className="text-diary-ink/70">No entries yet.</p>
            <Link
              to="/"
              className="inline-block mt-6 rounded-full bg-diary-pink text-white font-semibold px-6 py-3 shadow-diary-glow"
            >
              Write your first ✨
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {entries.map((e) => (
              <li
                key={e.id}
                className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow-diary-soft border border-white flex items-center gap-4"
              >
                <div className="text-4xl">{e.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-diary-ink/50">{formatDate(e.createdAt)}</div>
                  <div className="font-semibold text-diary-ink">{e.mood}</div>
                  <div className="text-xs text-diary-ink/60 truncate">{e.text}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-diary-ink">{e.score}</div>
                  <div className="text-[10px] text-diary-ink/40">/100</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
