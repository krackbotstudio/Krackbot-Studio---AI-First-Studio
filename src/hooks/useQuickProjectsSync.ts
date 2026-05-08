import { useEffect, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

const POLL_MS = 4000;

/**
 * Refetches when `quick_projects` changes: Realtime (if replication is on) + polling + tab focus.
 */
export function useQuickProjectsSync(onSync: () => void, enabled = true) {
  const cb = useRef(onSync);
  cb.current = onSync;

  useEffect(() => {
    if (!enabled || !isSupabaseConfigured()) return;

    const run = () => cb.current();

    const channel = supabase
      .channel("quick_projects_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "quick_projects" },
        () => run(),
      )
      .subscribe();

    const poll = window.setInterval(run, POLL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") run();
    };
    document.addEventListener("visibilitychange", onVisible);

    run();

    return () => {
      void supabase.removeChannel(channel);
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled]);
}
