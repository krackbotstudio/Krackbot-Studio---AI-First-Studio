/** Wraps fetch so requests abort after `ms` (Supabase REST uses fetch; hangs otherwise stay pending forever). */
export function createFetchWithTimeout(ms: number): typeof fetch {
  return (input: RequestInfo | URL, init?: RequestInit) => {
    const timeoutController = new AbortController();
    const id = setTimeout(() => timeoutController.abort(), ms);
    const upstream = init?.signal;
    if (upstream?.aborted) {
      clearTimeout(id);
      return Promise.reject(new DOMException("The operation was aborted.", "AbortError"));
    }
    const anyCtor = (
      AbortSignal as unknown as { any?: (signals: AbortSignal[]) => AbortSignal }
    ).any;
    const signal =
      upstream && typeof anyCtor === "function"
        ? anyCtor([upstream, timeoutController.signal])
        : timeoutController.signal;
    return fetch(input, { ...init, signal }).finally(() => clearTimeout(id));
  };
}
