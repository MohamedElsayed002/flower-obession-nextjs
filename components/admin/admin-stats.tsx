import { useFetchAdminStats, useFetchChartData } from "@/hooks";
import Chart from "./chart";
import StatsContainer from "./stats-container";
import { SingleProductSkeleton } from "../skeletons/single-product-skeleton";

export default function AdminStats() {
  const { data: adminStats, isPending: adminStatsLoading } = useFetchAdminStats();
  const { data: chartData, isPending: chartDataLoading } = useFetchChartData();

  if(adminStatsLoading || chartDataLoading) {
    return <SingleProductSkeleton/>
  }

  return (
    <div className="min-h-screen">
      {adminStats && <StatsContainer adminStats={adminStats || {}} />}
      {chartData && <Chart data={chartData || []} />}
    </div>
  );
}
