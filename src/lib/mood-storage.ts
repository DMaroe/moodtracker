import type { MoodEntry } from "./mood.functions";

export type { MoodEntry };

// The full mood history now lives server-side in D1 (see mood.functions.ts:
// listMoodEntries / saveMoodEntry). This file only handles handing the
// just-submitted entry from the "/" page to "/result" without a refetch or
// a URL param — sessionStorage is appropriate here since it's per-tab,
// throwaway UI state, not the source of truth.
const CURRENT = "mood-current-v1";

export function setCurrent(entry: MoodEntry) {
  sessionStorage.setItem(CURRENT, JSON.stringify(entry));
}

export function getCurrent(): MoodEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(CURRENT);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}
