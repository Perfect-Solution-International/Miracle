/** Re-export so `@/config/*` is the single import surface for configuration. */
export {
  PERMISSIONS,
  isPermission,
  type Permission,
} from "@/lib/permissions/permissions";
export {
  ROLES,
  ROLE_DEFINITIONS,
  getRoleDefinition,
  resolvePermissions,
  resolvePortal,
  isRole,
  type Role,
  type Portal,
  type RoleDefinition,
} from "@/lib/permissions/roles";
