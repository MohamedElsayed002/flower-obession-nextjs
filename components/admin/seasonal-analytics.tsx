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
    YAxis
} from "recharts";

interface HolidayPerformanceItem {
    _id: {
        month: number;
        day: number;
    };
    totalRevenue: number;
    orderCount: number;
    avgOrderValue: number;
}

interface MonthlySeasonalItem {
    month: number;
    totalRevenue: number;
    orderCount: number;
    avgOrderValue: number;
    uniqueCustomers: number;
}

interface SeasonalAnalyticsData {
    holidayPerformance: HolidayPerformanceItem[];
    monthlyPatterns: MonthlySeasonalItem[];
}

type SeasonalAnalyticsProps = {
    data: SeasonalAnalyticsData;
};

function SeasonalAnalytics({ data }: SeasonalAnalyticsProps) {
    const t = useTranslations();

    // Transform holiday performance data
    const holidayData = data.holidayPerformance.map((item: HolidayPerformanceItem) => {
        const month = item._id.month;
        const day = item._id.day;
        let holidayName = "";

        if (month === 2 && day === 14) holidayName = "Valentine's Day";
        else if (month === 5 && day >= 8 && day <= 14) holidayName = "Mother's Day";
        else if (month === 12 && day >= 20) holidayName = "Christmas Period";
        else if (month === 1 && day === 1) holidayName = "New Year";
        else if (month === 11 && day >= 20) holidayName = "Thanksgiving";
        else holidayName = `${month}/${day}`;

        return {
            holiday: holidayName,
            revenue: item.totalRevenue,
            orders: item.orderCount,
            avgOrderValue: item.avgOrderValue
        };
    });

    // Transform monthly patterns data
    const monthlyData = data.monthlyPatterns.map((item: MonthlySeasonalItem) => ({
        month: new Date(2024, item.month - 1).toLocaleDateString("en-US", { month: "short" }),
        revenue: item.totalRevenue,
        orders: item.orderCount,
        avgOrderValue: item.avgOrderValue,
        uniqueCustomers: item.uniqueCustomers
    }));

    // Calculate total holiday revenue
    const totalHolidayRevenue = holidayData.reduce((sum: number, item) => sum + item.revenue, 0);
    const totalHolidayOrders = holidayData.reduce((sum: number, item) => sum + item.orders, 0);

    return (
        <div className="space-y-8">
            {/* Holiday Performance Summary */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("total-holiday-revenue")}</h3>
                    <p className="text-3xl font-bold text-green-600">${totalHolidayRevenue.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("total-holiday-orders")}</h3>
                    <p className="text-3xl font-bold text-green-600">{totalHolidayOrders}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("avg-holiday-order-value")}</h3>
                    <p className="text-3xl font-bold text-green-600">
                        ${totalHolidayOrders > 0 ? (totalHolidayRevenue / totalHolidayOrders).toFixed(2) : 0}
                    </p>
                </div>
            </div>

            {/* Holiday Performance Chart */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("holiday-performance")}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={holidayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="holiday"
                            tick={{ fill: "#374151", fontSize: 12 }}
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
                                name === "revenue" ? t("revenue") : name === "orders" ? t("orders") : t("avg-order-value")
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
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Seasonal Patterns */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("monthly-seasonal-patterns")}</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Monthly Revenue Trend */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("monthly-revenue-trend")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, t("revenue")]}
                                    labelStyle={{ color: "#374151" }}
                                    contentStyle={{
                                        backgroundColor: "#f9fafb",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "8px"
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                                    activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Monthly Orders Trend */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("monthly-orders-trend")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                    stroke="#f59e0b"
                                    strokeWidth={3}
                                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                                    activeDot={{ r: 8, stroke: "#f59e0b", strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Holiday Performance Table */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("holiday-performance-details")}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-green-200">
                                <th className="px-4 py-3 text-left font-semibold text-green-800">{t("holiday")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("revenue")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("orders")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-order-value")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("revenue-share")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holidayData.map((item, index: number) => {
                                const revenueShare = totalHolidayRevenue > 0
                                    ? ((item.revenue / totalHolidayRevenue) * 100).toFixed(1)
                                    : 0;

                                return (
                                    <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                                        <td className="px-4 py-3 text-gray-700">{item.holiday}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                                            ${item.revenue.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700">{item.orders}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">
                                            ${item.avgOrderValue.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700">
                                            {revenueShare}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Monthly Patterns Table */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("monthly-patterns-details")}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-green-200">
                                <th className="px-4 py-3 text-left font-semibold text-green-800">{t("month")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("revenue")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("orders")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-order-value")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("unique-customers")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((item, index: number) => (
                                <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                                    <td className="px-4 py-3 text-gray-700">{item.month}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                                        ${item.revenue.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">{item.orders}</td>
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        ${item.avgOrderValue.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">{item.uniqueCustomers}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Seasonal Insights */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h2 className="mb-4 text-xl font-semibold text-green-800">{t("seasonal-insights")}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-green-200 bg-white p-4">
                        <h3 className="mb-2 font-semibold text-green-800">{t("best-performing-holiday")}</h3>
                        <p className="text-gray-700">
                            {holidayData.length > 0
                                ? `${holidayData[0].holiday} with $${holidayData[0].revenue.toLocaleString()} revenue`
                                : t("no-data-available")
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-white p-4">
                        <h3 className="mb-2 font-semibold text-green-800">{t("best-performing-month")}</h3>
                        <p className="text-gray-700">
                            {monthlyData.length > 0
                                ? `${monthlyData.reduce((max, month) => month.revenue > max.revenue ? month : max).month} with $${monthlyData.reduce((max, month) => month.revenue > max.revenue ? month : max).revenue.toLocaleString()} revenue`
                                : t("no-data-available")
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeasonalAnalytics;
