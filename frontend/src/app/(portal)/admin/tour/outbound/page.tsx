import { redirect } from "next/navigation";

export default function TourOutboundRedirectPage() {
  redirect("/admin/tours/outbound");
}
