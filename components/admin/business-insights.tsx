"use client";
import { useTranslations } from "next-intl";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

interface CustomerRetentionItem {
    _id: string;
    count: number;
    avgTotalSpent: number;
    avgDaysSinceLastOrder: number;
}

interface GeographicDistributionItem {
    _id: string;
    orderCount: number;
    totalRevenue: number;
    avgOrderValue: number;
}

interface ProductBundleItem {
    _id: string;
    frequency: number;
    avgQuantity: number;
}

interface BusinessInsightsData {
    customerRetention: CustomerRetentionItem[];
    geographicDistribution: GeographicDistributionItem[];
    productBundles: ProductBundleItem[];
}

type BusinessInsightsProps = {
    data: BusinessInsightsData;
};

function BusinessInsights({ data }: BusinessInsightsProps) {
    const t = useTranslations();

    // Transform customer retention data
    const retentionData = data.customerRetention.map((item: CustomerRetentionItem) => ({
        segment: item._id === "Other" ? t("other") : `${item._id} ${t("orders")}`,
        count: item.count,
        avgTotalSpent: Math.round(item.avgTotalSpent * 100) / 100,
        avgDaysSinceLastOrder: Math.round(item.avgDaysSinceLastOrder * 100) / 100
    }));

    // Transform geographic distribution data
    const geographicData = data.geographicDistribution.slice(0, 10).map((item: GeographicDistributionItem) => ({
        city: item._id || t("unknown"),
        orderCount: item.orderCount,
        totalRevenue: item.totalRevenue,
        avgOrderValue: Math.round(item.avgOrderValue * 100) / 100
    }));

    // Transform product bundles data
    const bundleData = data.productBundles.map((item: ProductBundleItem) => ({
        category: item._id || t("unknown"),
        frequency: item.frequency,
        avgQuantity: Math.round(item.avgQuantity * 100) / 100
    }));

    // Calculate customer retention metrics
    const totalCustomers = retentionData.reduce((sum: number, item) => sum + item.count, 0);
    const repeatCustomers = retentionData.filter((item) => item.segment !== "1 orders").reduce((sum: number, item) => sum + item.count, 0);
    const retentionRate = totalCustomers > 0 ? ((repeatCustomers / totalCustomers) * 100).toFixed(1) : 0;

    return (
        <div className="space-y-8">
            {/* Key Business Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("customer-retention-rate")}</h3>
                    <p className="text-3xl font-bold text-green-600">{retentionRate}%</p>
                    <p className="mt-1 text-sm text-gray-600">
                        {repeatCustomers} / {totalCustomers} {t("customers")}
                    </p>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-blue-800">{t("total-customers")}</h3>
                    <p className="text-3xl font-bold text-blue-600">{totalCustomers}</p>
                    <p className="mt-1 text-sm text-gray-600">{t("unique-customers")}</p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-purple-800">{t("top-cities")}</h3>
                    <p className="text-3xl font-bold text-purple-600">{geographicData.length}</p>
                    <p className="mt-1 text-sm text-gray-600">{t("cities-with-orders")}</p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-orange-800">{t("product-categories")}</h3>
                    <p className="text-3xl font-bold text-orange-600">{bundleData.length}</p>
                    <p className="mt-1 text-sm text-gray-600">{t("active-categories")}</p>
                </div>
            </div>

            {/* Customer Retention Analysis */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("customer-retention-analysis")}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={retentionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="segment"
                            tick={{ fill: "#374151", fontSize: 12 }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <YAxis
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                value,
                                name === "count" ? t("customers") : name === "avgTotalSpent" ? t("avg-total-spent") : t("avg-days-since-last-order")
                            ]}
                            labelStyle={{ color: "#374151" }}
                            contentStyle={{
                                backgroundColor: "#f9fafb",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px"
                            }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Geographic Distribution */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("geographic-distribution")}</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Orders by City */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("orders-by-city")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={geographicData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="city"
                                    tick={{ fill: "#374151", fontSize: 10 }}
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
                                <Bar
                                    dataKey="orderCount"
                                    fill="#f59e0b"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Revenue by City */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("revenue-by-city")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={geographicData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="city"
                                    tick={{ fill: "#374151", fontSize: 10 }}
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
                                    dataKey="totalRevenue"
                                    fill="#8b5cf6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Product Bundle Analysis */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("product-bundle-analysis")}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={bundleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="category"
                            tick={{ fill: "#374151", fontSize: 12 }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <YAxis
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                value,
                                name === "frequency" ? t("frequency") : t("avg-quantity")
                            ]}
                            labelStyle={{ color: "#374151" }}
                            contentStyle={{
                                backgroundColor: "#f9fafb",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px"
                            }}
                        />
                        <Bar
                            dataKey="frequency"
                            fill="#06b6d4"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Customer Retention Details Table */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("customer-retention-details")}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-green-200">
                                <th className="px-4 py-3 text-left font-semibold text-green-800">{t("customer-segment")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("customers")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-total-spent")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-days-since-last-order")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("percentage")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {retentionData.map((item, index: number) => {
                                const percentage = totalCustomers > 0 ? ((item.count / totalCustomers) * 100).toFixed(1) : 0;

                                return (
                                    <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                                        <td className="px-4 py-3 text-gray-700">{item.segment}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{item.count}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                                            ${item.avgTotalSpent.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700">
                                            {item.avgDaysSinceLastOrder} {t("days")}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700">
                                            {percentage}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Geographic Distribution Table */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("geographic-distribution-details")}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-green-200">
                                <th className="px-4 py-3 text-left font-semibold text-green-800">{t("city")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("orders")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("revenue")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-order-value")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {geographicData.map((item, index: number) => (
                                <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                                    <td className="px-4 py-3 text-gray-700">{item.city}</td>
                                    <td className="px-4 py-3 text-right text-gray-700">{item.orderCount}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                                        ${item.totalRevenue.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        ${item.avgOrderValue.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Business Insights Summary */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h2 className="mb-4 text-xl font-semibold text-green-800">{t("business-insights-summary")}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border border-green-200 bg-white p-4">
                        <h3 className="mb-2 font-semibold text-green-800">{t("top-performing-city")}</h3>
                        <p className="text-gray-700">
                            {geographicData.length > 0
                                ? `${geographicData[0].city} with ${geographicData[0].orderCount} orders`
                                : t("no-data-available")
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-white p-4">
                        <h3 className="mb-2 font-semibold text-green-800">{t("most-popular-category")}</h3>
                        <p className="text-gray-700">
                            {bundleData.length > 0
                                ? `${bundleData[0].category} with ${bundleData[0].frequency} bundles`
                                : t("no-data-available")
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-white p-4">
                        <h3 className="mb-2 font-semibold text-green-800">{t("customer-loyalty")}</h3>
                        <p className="text-gray-700">
                            {retentionRate}% {t("of-customers-make-repeat-purchases")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessInsights;
