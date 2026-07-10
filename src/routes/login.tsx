import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { checkPasscode, debugContext } from "@/lib/auth.functions";
import { useEffect, useState } from "react";
export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Mood Diary" }] }),
  component: Login,
});



function DebugPanel() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    debugContext().then(setResult).catch((e) => setResult({ error: String(e) }));
  }, []);

  return (
    <pre style={{ fontSize: 12, whiteSpace: "pre-wrap", background: "#eee", padding: 8 }}>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}
function Login() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitPasscode = useServerFn(checkPasscode);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode || loading) return;
    setLoading(true);
    setError(null);
    try {
      await submitPasscode({ data: { passcode } });
      navigate({ to: "/" });
    } catch {
      setError("That passcode isn't right — try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-diary-gradient px-5 py-10 flex flex-col items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white/70 backdrop-blur rounded-3xl p-8 shadow-diary-soft border border-white"
      >
        <div className="text-4xl text-center mb-4">💗</div>
        <h1 className="text-xl font-semibold text-diary-ink text-center mb-6">
          Enter passcode
        </h1>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="w-full rounded-xl border border-diary-ink/10 px-4 py-3 mb-3 outline-none focus:border-diary-pink"
          placeholder="Passcode"
          autoFocus
        />
        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-diary-pink text-white font-semibold px-6 py-3 shadow-diary-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
