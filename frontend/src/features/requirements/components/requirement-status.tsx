import { StatusBadge } from "@/components/data-display/status-badge";
import {
  requirementStatus,
  type RequirementStatus,
} from "@/lib/constants/statuses/requirement-status";

export function RequirementStatusBadge({ status }: { status: RequirementStatus }) {
  return (
    <StatusBadge
      label={requirementStatus.label(status)}
      variant={requirementStatus.variant(status)}
    />
  );
}
