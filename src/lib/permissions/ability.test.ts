import { describe, expect, it } from "vitest";

import { createAbility, guestAbility } from "./ability";
import { PERMISSIONS } from "./permissions";
import { ROLES, resolvePortal, type Role } from "./roles";

/**
 * The permission layer decides which UI a user sees, so its rules are asserted
 * directly rather than only through components.
 */
describe("createAbility", () => {
  it("grants a guest only public catalogue access", () => {
    expect(guestAbility.can("products.read")).toBe(true);
    expect(guestAbility.can("orders.read")).toBe(false);
    expect(guestAbility.can("cms.manage")).toBe(false);
  });

  it("gives a customer the buyer workflow but no staff capability", () => {
    const ability = createAbility({ roles: ["customer"] });

    expect(ability.can("requirements.create")).toBe(true);
    expect(ability.can("quotations.approve")).toBe(true);
    expect(ability.can("orders.create")).toBe(true);

    // A customer must never manage other customers or verify suppliers.
    expect(ability.can("customers.manage")).toBe(false);
    expect(ability.can("suppliers.verify")).toBe(false);
    expect(ability.can("reports.read")).toBe(false);
  });

  it("gives a supplier catalogue and quoting rights without buyer approval", () => {
    const ability = createAbility({ roles: ["supplier"] });

    expect(ability.can("products.manage")).toBe(true);
    expect(ability.can("quotations.create")).toBe(true);

    // Approving a quotation is the buyer's decision, not the supplier's.
    expect(ability.can("quotations.approve")).toBe(false);
    expect(ability.can("payments.manage")).toBe(false);
  });

  it("scopes finance staff to finance, not logistics", () => {
    const ability = createAbility({ roles: ["finance_staff"] });

    expect(ability.can("payments.manage")).toBe(true);
    expect(ability.can("invoices.manage")).toBe(true);
    expect(ability.can("imports.manage")).toBe(false);
  });

  it("grants a super admin every permission", () => {
    const ability = createAbility({ roles: ["super_admin"] });
    for (const permission of PERMISSIONS) {
      expect(ability.can(permission)).toBe(true);
    }
  });

  it("withholds tenant settings from a plain admin", () => {
    const ability = createAbility({ roles: ["admin"] });

    expect(ability.can("users.manage")).toBe(true);
    // Reserved for super admins.
    expect(ability.can("settings.manage")).toBe(false);
  });

  it("unions permissions across multiple roles", () => {
    const ability = createAbility({ roles: ["finance_staff", "logistics_staff"] });

    expect(ability.can("payments.manage")).toBe(true);
    expect(ability.can("imports.manage")).toBe(true);
  });

  it("applies backend-granted extra permissions", () => {
    const ability = createAbility({
      roles: ["customer"],
      extraPermissions: ["reports.read"],
    });

    expect(ability.can("reports.read")).toBe(true);
  });

  it("treats canAny with an empty list as unrestricted", () => {
    // Navigation items with no permissions are visible to any signed-in user.
    expect(createAbility({ roles: ["customer"] }).canAny([])).toBe(true);
  });

  it("requires every permission for canAll", () => {
    const ability = createAbility({ roles: ["customer"] });

    expect(ability.canAll(["requirements.create", "quotations.read"])).toBe(true);
    expect(ability.canAll(["requirements.create", "cms.manage"])).toBe(false);
  });
});

describe("resolvePortal", () => {
  it("routes each role to its portal", () => {
    expect(resolvePortal(["customer"])).toBe("customer");
    expect(resolvePortal(["supplier"])).toBe("supplier");
    expect(resolvePortal(["finance_staff"])).toBe("staff");
    expect(resolvePortal(["admin"])).toBe("admin");
  });

  it("picks the highest-privilege portal when roles are combined", () => {
    expect(resolvePortal(["customer", "admin"])).toBe("admin");
    expect(resolvePortal(["customer", "sales_staff"])).toBe("staff");
  });

  it("assigns every declared role a reachable portal", () => {
    // Guards against a new role being added without a portal mapping.
    for (const role of ROLES as readonly Role[]) {
      expect(resolvePortal([role])).toBeTruthy();
    }
  });
});
