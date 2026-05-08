import { Navigate } from "react-router-dom";
import { useCmsAuth } from "@/contexts/CmsAuthContext";

export function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const { isSuperAdmin } = useCmsAuth();

  if (!isSuperAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}
