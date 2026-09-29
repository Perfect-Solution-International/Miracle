import { redirect } from "next/navigation";

export default function TourRedirectPage() {
  redirect("/admin/tours/inbound");
}
