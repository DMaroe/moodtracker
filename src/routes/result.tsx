import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCurrent, type MoodEntry } from "@/lib/mood-storage";
import { requireAuth } from "@/lib/require-auth";

export const Route = createFileRoute("/result")({
  beforeLoad: requireAuth,
  head: () => ({ meta: [{ title: "Your Mood — Mood Diary" }] }),
  component: Result,
});

function Result() {
  const [entry, setEntry] = useState<MoodEntry | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cur = getCurrent();
    if (!cur) {
      navigate({ to: "/" });
      return;
    }
    setEntry(cur);
  }, [navigate]);

  if (!entry) return null;

  return (
    <div className="min-h-screen bg-diary-gradient-warm px-5 py-10 flex flex-col relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-diary-pink/30 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-diary-blue/30 blur-3xl animate-float-slower" />

      <header className="relative flex items-center justify-between max-w-md mx-auto w-full">
        <Link to="/" className="text-sm text-diary-ink/70 hover:text-diary-ink font-medium">
          ← New entry
        </Link>
        <Link to="/history" className="text-sm text-diary-ink/70 hover:text-diary-ink font-medium">
          History
        </Link>
      </header>

      <main className="relative flex-1 max-w-md mx-auto w-full flex flex-col items-center justify-center text-center">
        <div className="text-9xl animate-emoji-pop drop-shadow-sm">{entry.emoji}</div>
        <h1 className="mt-6 text-4xl font-semibold text-diary-ink">{entry.mood}</h1>
        <div className="mt-3 text-lg text-diary-ink/60">
          <span className="text-2xl font-semibold text-diary-ink">{entry.score}</span>
          <span className="text-diary-ink/50">/100</span>
        </div>

        <div className="mt-8 bg-white/70 backdrop-blur rounded-3xl p-6 shadow-diary-soft border border-white">
          <p className="text-diary-ink/80 leading-relaxed italic">
            "{entry.summary}"
          </p>
        </div>

        <Link
          to="/"
          className="mt-10 rounded-full bg-diary-pink text-white font-semibold px-8 py-4 shadow-diary-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Write another 💗
        </Link>
      </main>
    </div>
  );
}
