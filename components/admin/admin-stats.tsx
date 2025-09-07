import { useFetchAdminStats, useFetchChartData } from "@/hooks";

import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";
import Chart from "./chart";
import EnhancedAdminStats from "./enhanced-admin-stats";

export default function AdminStats() {
  const { data: adminStats, isPending: adminStatsLoading } = useFetchAdminStats();
  const { data: chartData, isPending: chartDataLoading } = useFetchChartData();

  if (adminStatsLoading || chartDataLoading) {
    return <SingleProductSkeleton />
  }

  return (
    <div className="min-h-screen">
      {adminStats && <EnhancedAdminStats data={adminStats} />}
      {chartData && <Chart data={chartData || []} />}
    </div>
  );
}
