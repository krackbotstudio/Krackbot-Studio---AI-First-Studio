/** Maps Supabase/network errors to actionable messages for the CMS login UI. */
export function formatSupabaseLoginError(err: Error | unknown): string {
  const raw =
    err && typeof err === "object" && "message" in err && typeof (err as Error).message === "string"
      ? (err as Error).message
      : String(err);

  const lower = raw.toLowerCase();
  if (
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("network request failed") ||
    lower.includes("load failed")
  ) {
    return [
      "Cannot reach Supabase (browser “Failed to fetch”). Usually this means env vars are wrong or the dev server was not restarted.",
      "",
      "Fix: In the project root `.env` set exactly:",
      "  VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co",
      "  VITE_SUPABASE_ANON_KEY=<anon public key from Supabase → Project Settings → API>",
      "",
      "The names must start with VITE_. Then stop and run `npm run dev` again.",
      "Confirm the URL has https and matches your project (no trailing path).",
    ].join("\n");
  }

  if (lower.includes("lock broken by another request")) {
    return "Another auth request interrupted sign-in. Please wait 2-3 seconds and try again once.";
  }

  return raw;
}
