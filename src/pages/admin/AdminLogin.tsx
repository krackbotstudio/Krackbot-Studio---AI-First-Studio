import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useCmsAuth } from "@/contexts/CmsAuthContext";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

const AdminLogin = () => {
  const { session, login, loading: authLoading } = useCmsAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin/dashboard";
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  if (session) {
    return <Navigate to={from.startsWith("/admin") ? from : "/admin/dashboard"} replace />;
  }

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    const res = await login(data.email, data.password);
    setSubmitting(false);
    if (res.ok) {
      navigate(from.startsWith("/admin") ? from : "/admin/dashboard", { replace: true });
    } else {
      form.setError("root", { message: res.error ?? "Login failed" });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Krackbot CMS</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in with your CMS account (Supabase Auth).</p>

        {!isSupabaseConfigured() && (
          <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
            Supabase URL/key are not loaded. Add <code className="text-[11px]">VITE_SUPABASE_URL</code> and{" "}
            <code className="text-[11px]">VITE_SUPABASE_ANON_KEY</code> to <code className="text-[11px]">.env</code> in the
            project folder (not only SQL), then restart <code className="text-[11px]">npm run dev</code>.
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.errors.root && (
              <p className="text-sm text-destructive whitespace-pre-wrap">{form.formState.errors.root.message}</p>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="username" className="rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" className="rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-xl" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          <Link to="/" className="text-primary hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
