import { useEffect, useState } from "react";
import { CMS_ASSIGNABLE_SECTIONS, type CmsSectionId } from "@/config/cms";
import { listRoles, createRole, updateRole, deleteRole, type CmsRole } from "@/lib/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const AdminRolesPage = () => {
  const [roles, setRoles] = useState<CmsRole[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionIds, setSectionIds] = useState<CmsSectionId[]>(["dashboard"]);

  const refresh = async () => {
    try {
      setRoles(await listRoles());
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load roles.");
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const toggleSection = (id: CmsSectionId, checked: boolean) => {
    setSectionIds((prev) => {
      if (checked) return Array.from(new Set([...prev, id]));
      return prev.filter((x) => x !== id);
    });
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Role name is required.");
      return;
    }
    try {
      const ids = ensureDashboard(sectionIds);
      await createRole({
        name: name.trim(),
        description: description.trim(),
        sectionIds: ids,
      });
      setName("");
      setDescription("");
      setSectionIds(["dashboard"]);
      await refresh();
      toast.success("Role created.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not create role.");
    }
  };

  const handleDelete = async (role: CmsRole) => {
    if (!confirm(`Delete role “${role.name}”? Staff using it will lose access.`)) return;
    try {
      await deleteRole(role.id);
      await refresh();
      toast.success("Role deleted.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete role.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Roles &amp; access</h1>
      <p className="text-muted-foreground mb-8">
        Create roles and choose which CMS areas each role can open. Super admin always has full access.
      </p>

      <div className="rounded-2xl border border-border bg-card p-6 mb-10">
        <h2 className="font-semibold text-foreground mb-4">New role</h2>
        <div className="grid gap-4 max-w-xl">
          <div>
            <Label htmlFor="role-name">Name</Label>
            <Input
              id="role-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Build manager"
              className="mt-1.5 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="role-desc">Description</Label>
            <Input
              id="role-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
              className="mt-1.5 rounded-xl"
            />
          </div>
          <div>
            <Label className="mb-2 block">CMS page access</Label>
            <div className="space-y-2">
              {CMS_ASSIGNABLE_SECTIONS.map((s) => (
                <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={sectionIds.includes(s.id)}
                    onCheckedChange={(v) => toggleSection(s.id, v === true)}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>
          <Button type="button" onClick={() => void handleCreate()} className="rounded-xl w-fit">
            Create role
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-semibold text-lg">Existing roles</h2>
        {roles.length === 0 && <p className="text-sm text-muted-foreground">No custom roles yet.</p>}
        {roles.map((role) => (
          <RoleRow key={role.id} role={role} onChange={() => void refresh()} onDelete={() => void handleDelete(role)} />
        ))}
      </div>
    </div>
  );
};

function RoleRow({
  role,
  onChange,
  onDelete,
}: {
  role: CmsRole;
  onChange: () => void;
  onDelete: () => void;
}) {
  const [ids, setIds] = useState<CmsSectionId[]>(role.sectionIds);

  useEffect(() => {
    setIds(role.sectionIds);
  }, [role.id, role.sectionIds]);

  const toggle = (id: CmsSectionId, checked: boolean) => {
    setIds((prev) => {
      const next = checked ? Array.from(new Set([...prev, id])) : prev.filter((x) => x !== id);
      return next.length ? next : ["dashboard"];
    });
  };

  const save = async () => {
    try {
      await updateRole(role.id, { sectionIds: ensureDashboard(ids) });
      onChange();
      toast.success("Saved.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed.");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div>
        <p className="font-semibold text-foreground">{role.name}</p>
        {role.description && <p className="text-sm text-muted-foreground mt-1">{role.description}</p>}
        <div className="mt-4 space-y-2">
          {CMS_ASSIGNABLE_SECTIONS.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={ids.includes(s.id)} onCheckedChange={(v) => toggle(s.id, v === true)} />
              <span>{s.label}</span>
            </label>
          ))}
        </div>
        <Button type="button" variant="secondary" size="sm" className="mt-4 rounded-lg" onClick={() => void save()}>
          Save permissions
        </Button>
      </div>
      <Button type="button" variant="destructive" size="sm" className="rounded-lg shrink-0" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
}

function ensureDashboard(ids: CmsSectionId[]): CmsSectionId[] {
  if (ids.length === 0) return ["dashboard"];
  if (!ids.includes("dashboard")) return ["dashboard", ...ids];
  return ids;
}

export default AdminRolesPage;
