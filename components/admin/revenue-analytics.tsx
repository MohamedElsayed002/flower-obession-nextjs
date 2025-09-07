"use client";
import { useTranslations } from "next-intl";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis} from "recharts";

type RevenueAnalyticsProps = {
    data: RevenueAnalyticsResponse;
};

function RevenueAnalytics({ data }: RevenueAnalyticsProps) {
    const t = useTranslations();

    // Transform monthly revenue data for the chart
    const monthlyChartData = data.monthlyRevenue.map(item => ({
        month: new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        revenue: item.revenue,
        orders: item.orderCount,
        fullDate: item.date
    }));

    // Calculate total revenue
    const totalRevenue = data.monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = data.monthlyRevenue.reduce((sum, item) => sum + item.orderCount, 0);
    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    return (
        <section className="mt-8 space-y-8">
            {/* Revenue Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("total-revenue")}</h3>
                    <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("total-orders")}</h3>
                    <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("average-order-value")}</h3>
                    <p className="text-3xl font-bold text-green-600">${averageOrderValue}</p>
                </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("monthly-revenue")}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <YAxis
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                name === "revenue" ? `$${value.toLocaleString()}` : value,
                                name === "revenue" ? t("revenue") : t("orders")
                            ]}
                            labelStyle={{ color: "#374151" }}
                            contentStyle={{
                                backgroundColor: "#f9fafb",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px"
                            }}
                        />
                        <Bar
                            dataKey="revenue"
                            fill="#10b981"
                            barSize={60}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Orders Chart */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("monthly-orders")}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <YAxis
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <Tooltip
                            formatter={(value: number) => [value, t("orders")]}
                            labelStyle={{ color: "#374151" }}
                            contentStyle={{
                                backgroundColor: "#f9fafb",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px"
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Revenue Table */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("revenue-details")}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-green-200">
                                <th className="px-4 py-3 text-left font-semibold text-green-800">{t("month")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("revenue")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("orders")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-order-value")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyChartData.map((item, index) => (
                                <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                                    <td className="px-4 py-3 text-gray-700">{item.month}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                                        ${item.revenue.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">{item.orders}</td>
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        ${item.orders > 0 ? (item.revenue / item.orders).toFixed(2) : "0.00"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default RevenueAnalytics;
