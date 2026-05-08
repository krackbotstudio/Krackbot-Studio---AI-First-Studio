import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured, getSupabaseConfigIssue } from "@/lib/supabaseClient";
import { formatSupabaseLoginError } from "@/lib/supabaseErrors";
import type { CmsSectionId } from "@/config/cms";

export type CmsSession = {
  email: string;
  isSuperAdmin: boolean;
  sectionIds: CmsSectionId[];
};

type CmsAuthContextValue = {
  session: CmsSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  canAccessSection: (sectionId: CmsSectionId) => boolean;
  isSuperAdmin: boolean;
};

const CmsAuthContext = createContext<CmsAuthContextValue | null>(null);

const MISSING_PROFILE_HELP = `No cms_profiles row for this account. In the Supabase project that matches your app’s VITE_SUPABASE_URL, open SQL Editor and run:

insert into public.cms_profiles (user_id, email, role_id, is_super_admin)
select id, lower(trim(coalesce(email, ''))), null, true
from auth.users
where lower(trim(email)) = lower(trim('YOUR_EMAIL_HERE'))
on conflict (user_id) do update set
  is_super_admin = excluded.is_super_admin,
  email = excluded.email;

Replace YOUR_EMAIL_HERE with the same email you use to sign in. Use Authentication → Users to confirm the user exists.`;

async function loadSessionFromUser(user: User): Promise<CmsSession | null> {
  const { session } = await loadSessionFromUserDetailed(user);
  return session;
}

async function loadSessionFromUserDetailed(user: User): Promise<{
  session: CmsSession | null;
  profileSelectError?: string;
}> {
  const { data: profile, error } = await supabase
    .from("cms_profiles")
    .select("email, is_super_admin, role_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return { session: null, profileSelectError: error.message };
  if (!profile) return { session: null };

  const row = profile as { email: string; is_super_admin: boolean; role_id: string | null };

  if (row.is_super_admin) {
    return { session: { email: row.email, isSuperAdmin: true, sectionIds: [] } };
  }

  if (!row.role_id) {
    return { session: { email: row.email, isSuperAdmin: false, sectionIds: ["dashboard"] } };
  }

  const { data: roleRow } = await supabase.from("cms_roles").select("section_ids").eq("id", row.role_id).maybeSingle();

  const sections = ((roleRow?.section_ids as string[]) ?? []) as CmsSectionId[];

  return {
    session: {
      email: row.email,
      isSuperAdmin: false,
      sectionIds: sections.length ? sections : ["dashboard"],
    },
  };
}

export function CmsAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CmsSession | null>(null);
  const [loading, setLoading] = useState(true);

  const applyAuthUser = useCallback(async (user: User | null) => {
    try {
      if (!user) {
        setSession(null);
        return;
      }
      const s = await loadSessionFromUser(user);
      setSession(s);
    } catch {
      setSession(null);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const bootstrapWatchdog = window.setTimeout(() => {
      if (cancelled) return;
      setSession(null);
      setLoading(false);
    }, 6000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession: Session | null) => {
      try {
        if (cancelled) return;
        await applyAuthUser(nextSession?.user ?? null);
      } catch {
        if (cancelled) return;
        setSession(null);
      } finally {
        if (!cancelled) setLoading(false);
        window.clearTimeout(bootstrapWatchdog);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(bootstrapWatchdog);
      subscription.unsubscribe();
    };
  }, [applyAuthUser]);

  const login = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return {
        ok: false,
        error: getSupabaseConfigIssue() ?? "Supabase env vars are missing or invalid.",
      };
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) return { ok: false, error: formatSupabaseLoginError(error) };
      if (!data.user) return { ok: false, error: "Login failed." };
      const { session: s, profileSelectError } = await loadSessionFromUserDetailed(data.user);
      if (!s) {
        await supabase.auth.signOut();
        if (profileSelectError) {
          return {
            ok: false,
            error: `Could not read cms_profiles (${profileSelectError}). Check RLS policies and that the cms_profiles table exists.`,
          };
        }
        return { ok: false, error: MISSING_PROFILE_HELP };
      }
      setSession(s);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: formatSupabaseLoginError(e) };
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const canAccessSection = useCallback(
    (sectionId: CmsSectionId) => {
      if (!session) return false;
      if (session.isSuperAdmin) return true;
      if (sectionId === "roles" || sectionId === "users") return false;
      return session.sectionIds.includes(sectionId);
    },
    [session],
  );

  const value = useMemo(
    () => ({
      session,
      loading,
      login,
      logout,
      canAccessSection,
      isSuperAdmin: session?.isSuperAdmin ?? false,
    }),
    [session, loading, login, logout, canAccessSection],
  );

  return <CmsAuthContext.Provider value={value}>{children}</CmsAuthContext.Provider>;
}

export function useCmsAuth() {
  const ctx = useContext(CmsAuthContext);
  if (!ctx) throw new Error("useCmsAuth must be used within CmsAuthProvider");
  return ctx;
}
