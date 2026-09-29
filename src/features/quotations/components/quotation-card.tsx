import Link from "next/link";

import { CurrencyDisplay } from "@/components/data-display/currency-display";
import { DateDisplay } from "@/components/data-display/date-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isExpiringSoon } from "../utils/quotation.utils";
import { QuotationStatusBadge } from "./quotation-status";
import type { QuotationSummary } from "../types/quotation.types";

/** Compact quotation summary for dashboards and mobile lists. */
export function QuotationCard({
  quotation,
  href,
}: {
  quotation: QuotationSummary;
  href: string;
}) {
  const expiringSoon = isExpiringSoon(quotation.validUntil);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base">
            <Link href={href} className="hover:underline">
              {quotation.reference}
            </Link>
          </CardTitle>
          <p className="text-muted-foreground text-sm">{quotation.customerName}</p>
        </div>
        <QuotationStatusBadge status={quotation.status} />
      </CardHeader>
      <CardContent className="space-y-2">
        <CurrencyDisplay
          amountMinor={quotation.totalMinor}
          currency={quotation.currency}
          showCode
          className="text-lg font-semibold"
        />
        {quotation.validUntil ? (
          <p className="text-muted-foreground text-xs">
            Valid until <DateDisplay value={quotation.validUntil} />
            {expiringSoon ? (
              <span className="text-destructive ml-1 font-medium">Expiring soon</span>
            ) : null}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
