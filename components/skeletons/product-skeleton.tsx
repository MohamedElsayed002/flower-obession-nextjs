import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="bg-gray-200 w-96 h-96 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="bg-gray-200 h-4 w-[250px]" />
        <Skeleton className="bg-gray-200 h-4 w-[250px]" />
      </div>
    </div>
  );
}
