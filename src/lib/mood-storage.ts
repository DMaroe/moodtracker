import type { MoodResult } from "./mood.functions";

export type MoodEntry = MoodResult & {
  id: string;
  text: string;
  createdAt: string;
};

const KEY = "mood-history-v1";
const CURRENT = "mood-current-v1";

export function getHistory(): MoodEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addEntry(entry: MoodEntry) {
  const list = getHistory();
  list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 100)));
}

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
