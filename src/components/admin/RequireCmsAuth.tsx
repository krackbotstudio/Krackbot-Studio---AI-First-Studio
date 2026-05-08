import { Navigate, useLocation } from "react-router-dom";
import { useCmsAuth } from "@/contexts/CmsAuthContext";

export function RequireCmsAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useCmsAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
