/** Only this account is the super admin (full CMS access + role & user management). */
export const CMS_SUPER_ADMIN_EMAIL = "krackbotstudio@gmail.com";

/**
 * CMS sections — assignable per role. Super admin always has all sections.
 * `id` is stored on roles; `path` is used for route guards and nav links.
 */
export const CMS_SECTIONS = [
  { id: "dashboard", path: "/admin", label: "Dashboard" },
  { id: "quick_builds", path: "/admin/quick-builds", label: "Quick AI builds" },
  { id: "roles", path: "/admin/roles", label: "Roles & access" },
  { id: "users", path: "/admin/users", label: "Admin users" },
] as const;

export type CmsSectionId = (typeof CMS_SECTIONS)[number]["id"];

export function getSectionById(id: string) {
  return CMS_SECTIONS.find((s) => s.id === id);
}

/** Sections super admins can grant to custom roles (excludes role & user management). */
export const CMS_ASSIGNABLE_SECTIONS = CMS_SECTIONS.filter((s) => s.id !== "roles" && s.id !== "users");
