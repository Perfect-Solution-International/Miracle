import { QUERY_NAMESPACES } from "@/lib/query/query-keys";

/** Query keys for the auth feature. */
export const authKeys = {
  all: [QUERY_NAMESPACES.auth] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
};
