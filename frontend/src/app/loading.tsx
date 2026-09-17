import { LoadingState } from "@/components/feedback/loading-state";

export default function Loading() {
  return (
    <div className="p-6">
      <LoadingState rows={6} />
    </div>
  );
}
