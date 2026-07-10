import { redirect } from "@tanstack/react-router";
import { isAuthed } from "@/lib/auth.functions";

export async function requireAuth() {
  const { authed } = await isAuthed();
  if (!authed) {
    throw redirect({ to: "/login" });
  }
}
