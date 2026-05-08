import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCmsAuth } from "@/contexts/CmsAuthContext";
import { listProjects } from "@/lib/quickProjectsApi";
import { listRoles, listStaffProfiles } from "@/lib/cmsApi";

const AdminDashboard = () => {
  const { isSuperAdmin } = useCmsAuth();
  const [builds, setBuilds] = useState(0);
  const [roles, setRoles] = useState(0);
  const [staff, setStaff] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [p, r, s] = await Promise.all([listProjects(), listRoles(), listStaffProfiles()]);
        if (cancelled) return;
        setBuilds(p.length);
        setRoles(r.length);
        setStaff(s.filter((x) => !x.isSuperAdmin).length);
      } catch {
        if (!cancelled) {
          setBuilds(0);
          setRoles(0);
          setStaff(0);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Manage Quick AI build requests, roles, and staff access from the sidebar.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Quick build requests</p>
          <p className="text-3xl font-bold text-foreground mt-1">{builds}</p>
          <Link to="/admin/quick-builds" className="text-sm text-primary hover:underline mt-3 inline-block">
            Open queue →
          </Link>
        </div>
        {isSuperAdmin && (
          <>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Custom roles</p>
              <p className="text-3xl font-bold text-foreground mt-1">{roles}</p>
              <Link to="/admin/roles" className="text-sm text-primary hover:underline mt-3 inline-block">
                Manage roles →
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Staff accounts</p>
              <p className="text-3xl font-bold text-foreground mt-1">{staff}</p>
              <Link to="/admin/users" className="text-sm text-primary hover:underline mt-3 inline-block">
                Manage users →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
