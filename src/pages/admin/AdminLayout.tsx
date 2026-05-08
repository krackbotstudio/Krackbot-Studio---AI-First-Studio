import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Shield, Zap, LogOut } from "lucide-react";
import { CMS_SECTIONS } from "@/config/cms";
import { useCmsAuth } from "@/contexts/CmsAuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  quick_builds: Zap,
  roles: Shield,
  users: Users,
};

const AdminLayout = () => {
  const { canAccessSection, logout, session, isSuperAdmin } = useCmsAuth();
  const navigate = useNavigate();

  const navItems = CMS_SECTIONS.filter((s) => canAccessSection(s.id));

  return (
    <div className="min-h-screen bg-muted/20 flex">
      <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-5 border-b border-border">
          <p className="font-display font-bold text-lg text-foreground">CMS</p>
          <p className="text-xs text-muted-foreground truncate mt-1" title={session?.email}>
            {session?.email}
          </p>
          {isSuperAdmin && (
            <span className="inline-block mt-2 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
              Super admin
            </span>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((s) => {
            const Icon = ICONS[s.id] ?? LayoutDashboard;
            return (
              <NavLink
                key={s.id}
                to={s.path === "/admin" ? "/admin/dashboard" : s.path}
                end={s.id === "dashboard"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {s.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={() => {
              void (async () => {
                await logout();
                navigate("/admin/login", { replace: true });
              })();
            }}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-10 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
