import { Navigate } from "react-router-dom";
import { useCmsAuth } from "@/contexts/CmsAuthContext";
import type { CmsSectionId } from "@/config/cms";

export function RequireSection({ sectionId, children }: { sectionId: CmsSectionId; children: React.ReactNode }) {
  const { canAccessSection } = useCmsAuth();

  if (!canAccessSection(sectionId)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}
