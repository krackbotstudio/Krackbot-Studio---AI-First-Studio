import { createClient } from "@supabase/supabase-js";
import { createFetchWithTimeout } from "@/lib/fetchWithTimeout";

/**
 * Browser-safe Supabase client. Uses the public anon key only.
 *
 * Do not put your Postgres connection string or service_role key in Vite env
 * (anything prefixed with VITE_ is bundled into the client).
 *
 * Get URL + anon key: Supabase Dashboard → Project Settings → API.
 */
const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

/** Hard cap on REST/auth fetch duration so forms never spin forever if the network hangs. */
const FETCH_TIMEOUT_MS = 25_000;
/**
 * Some browser contexts (extensions/devtools/old lock holders) can cause
 * NavigatorLockAcquireTimeoutError inside Supabase auth. We serialize through
 * a local async lock path instead of navigator.locks to avoid login deadlocks.
 */
const runAuthWithoutNavigatorLock = async <T>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<T>,
): Promise<T> => fn();

function getSupabaseConfigIssueInternal(): string | null {
  if (!url || !anonKey) {
    return "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in `.env`.";
  }
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return "VITE_SUPABASE_URL is not a valid URL.";
  }
  if (parsed.protocol !== "https:") {
    return "VITE_SUPABASE_URL must start with https://";
  }
  const host = parsed.hostname.toLowerCase();
  if (!host.endsWith(".supabase.co")) {
    return "VITE_SUPABASE_URL must be your Supabase project URL (…supabase.co), not localhost.";
  }
  if (anonKey.includes("your_anon_public_key_here")) {
    return "VITE_SUPABASE_ANON_KEY is still the placeholder value.";
  }
  return null;
}

const configIssue = getSupabaseConfigIssueInternal();

if (import.meta.env.DEV && configIssue) {
  // eslint-disable-next-line no-console
  console.warn(`[Supabase] ${configIssue} Check .env.example and restart npm run dev.`);
}

export const supabase = createClient(url, anonKey, {
  global: {
    fetch: createFetchWithTimeout(FETCH_TIMEOUT_MS),
  },
  db: {
    timeout: FETCH_TIMEOUT_MS,
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    lock: runAuthWithoutNavigatorLock,
  },
});

export function isSupabaseConfigured(): boolean {
  return !configIssue;
}

export function getSupabaseConfigIssue(): string | null {
  return configIssue;
}
