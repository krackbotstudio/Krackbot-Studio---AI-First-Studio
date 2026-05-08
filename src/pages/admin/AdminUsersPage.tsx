import { useEffect, useState } from "react";
import { CMS_SUPER_ADMIN_EMAIL } from "@/config/cms";
import { listRoles, listStaffProfiles, inviteStaffUser, deleteStaffProfile, type CmsProfileRow } from "@/lib/cmsApi";
import type { CmsRole } from "@/lib/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<CmsProfileRow[]>([]);
  const [roles, setRoles] = useState<CmsRole[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");

  const refresh = async () => {
    try {
      const [u, r] = await Promise.all([listStaffProfiles(), listRoles()]);
      setUsers(u.filter((x) => !x.isSuperAdmin));
      setRoles(r);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load users.");
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  useEffect(() => {
    if (roles.length && !roleId) setRoleId(roles[0].id);
  }, [roles, roleId]);

  const handleCreate = async () => {
    const e = email.trim().toLowerCase();
    if (!e || !password || !roleId) {
      toast.error("Email, password, and role are required.");
      return;
    }
    if (e === CMS_SUPER_ADMIN_EMAIL.toLowerCase()) {
      toast.error("That email is reserved for the super admin account.");
      return;
    }
    try {
      await inviteStaffUser(e, password, roleId);
      setEmail("");
      setPassword("");
      await refresh();
      toast.success("Invitation sent. If email confirmation is on, they must confirm before signing in.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create user.");
    }
  };

  const handleDelete = async (u: CmsProfileRow) => {
    if (!confirm(`Remove CMS access for ${u.email}? (Auth user may still exist in Supabase.)`)) return;
    try {
      await deleteStaffProfile(u.userId);
      await refresh();
      toast.success("Profile removed.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not remove user.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Admin users</h1>
      <p className="text-muted-foreground mb-8">
        Invite staff (Supabase Auth). They sign in with email and password. Super admin accounts are not listed here.
      </p>

      <div className="rounded-2xl border border-border bg-card p-6 mb-10">
        <h2 className="font-semibold text-foreground mb-4">Add staff</h2>
        <div className="grid gap-4 max-w-xl">
          <div>
            <Label htmlFor="staff-email">Email</Label>
            <Input
              id="staff-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="staff-pw">Password</Label>
            <Input
              id="staff-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 rounded-xl"
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select value={roleId} onValueChange={setRoleId}>
              <SelectTrigger className="mt-1.5 rounded-xl">
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {roles.length === 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Create a role first under Roles &amp; access.</p>
            )}
          </div>
          <Button type="button" onClick={() => void handleCreate()} className="rounded-xl w-fit" disabled={!roles.length}>
            Invite user
          </Button>
        </div>
      </div>

      <h2 className="font-semibold text-lg mb-4">Staff accounts</h2>
      <div className="rounded-2xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-muted-foreground">
                  No staff users yet.
                </TableCell>
              </TableRow>
            )}
            {users.map((u) => (
              <TableRow key={u.userId}>
                <TableCell className="font-mono text-sm">{u.email}</TableCell>
                <TableCell>{u.role?.name ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <Button type="button" variant="destructive" size="sm" className="rounded-lg" onClick={() => void handleDelete(u)}>
                    Remove access
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
