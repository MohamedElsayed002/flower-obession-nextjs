"use client";
import { useTranslations } from "next-intl";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

interface CategoryPerformanceItem {
    _id: string;
    totalRevenue: number;
    totalQuantitySold: number;
    orderCount: number;
    avgPrice: number;
}

interface InventoryTurnoverItem {
    productName: string;
    turnoverRate: number;
    currentStock: number;
    totalSold: number;
}

interface SeasonalTrendItem {
    month: number;
    category: string;
    totalRevenue: number;
}

interface ProductAnalyticsData {
    categoryPerformance: CategoryPerformanceItem[];
    inventoryTurnover: InventoryTurnoverItem[];
    seasonalTrends: SeasonalTrendItem[];
}

type ProductAnalyticsProps = {
    data: ProductAnalyticsData;
};

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16"];

function ProductAnalytics({ data }: ProductAnalyticsProps) {
    const t = useTranslations();

    // Transform category performance data for charts
    const categoryData = data.categoryPerformance.map((item: CategoryPerformanceItem, index: number) => ({
        name: item._id || "Unknown",
        revenue: item.totalRevenue,
        quantity: item.totalQuantitySold,
        orders: item.orderCount,
        avgPrice: item.avgPrice,
        color: COLORS[index % COLORS.length]
    }));

    // Transform inventory turnover data
    const inventoryData = data.inventoryTurnover.slice(0, 10).map((item: InventoryTurnoverItem) => ({
        name: item.productName.length > 20 ? item.productName.substring(0, 20) + "..." : item.productName,
        turnoverRate: Math.round(item.turnoverRate * 100) / 100,
        currentStock: item.currentStock,
        totalSold: item.totalSold
    }));

    return (
        <div className="space-y-8">
            {/* Category Performance */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("category-performance")}</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Category Revenue Chart */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("revenue-by-category")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: "#374151", fontSize: 12 }}
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
                                <Bar
                                    dataKey="revenue"
                                    fill="#10b981"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Distribution Pie Chart */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("category-distribution")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="quantity"
                                >
                                    {categoryData.map((entry, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Inventory Turnover Analysis */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("inventory-turnover-analysis")}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={inventoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#374151", fontSize: 10 }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <YAxis
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                name === "turnoverRate" ? value.toFixed(2) : value,
                                name === "turnoverRate" ? t("turnover-rate") : name === "currentStock" ? t("current-stock") : t("total-sold")
                            ]}
                            labelStyle={{ color: "#374151" }}
                            contentStyle={{
                                backgroundColor: "#f9fafb",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px"
                            }}
                        />
                        <Bar
                            dataKey="turnoverRate"
                            fill="#f59e0b"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Category Performance Table */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("category-details")}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-green-200">
                                <th className="px-4 py-3 text-left font-semibold text-green-800">{t("category")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("revenue")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("quantity-sold")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("orders")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-price")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData.map((item, index: number) => (
                                <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                                    <td className="px-4 py-3 text-gray-700">{item.name}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                                        ${item.revenue.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">{item.quantity}</td>
                                    <td className="px-4 py-3 text-right text-gray-700">{item.orders}</td>
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        ${item.avgPrice.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Products by Turnover */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("top-products-turnover")}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {inventoryData.slice(0, 6).map((item, index: number) => (
                        <div key={index} className="rounded-lg border border-green-100 bg-green-50 p-4">
                            <h3 className="font-semibold text-green-800">{item.name}</h3>
                            <div className="mt-2 space-y-1">
                                <p className="text-sm text-gray-600">
                                    {t("turnover-rate")}: <span className="font-semibold text-green-600">{item.turnoverRate}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    {t("current-stock")}: <span className="font-semibold text-green-600">{item.currentStock}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    {t("total-sold")}: <span className="font-semibold text-green-600">{item.totalSold}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductAnalytics;
