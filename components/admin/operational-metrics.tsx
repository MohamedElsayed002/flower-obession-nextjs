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

interface PaymentMethodItem {
    _id: string;
    count: number;
    totalAmount: number;
    avgAmount: number;
}

interface DeliveryPerformanceItem {
    _id: string;
    count: number;
    avgDeliveryTime: number;
}

interface RefundCancellationItem {
    _id: string;
    count: number;
    totalAmount: number;
    percentage: number;
}

interface PeakHoursItem {
    _id: number;
    orderCount: number;
    avgOrderValue: number;
}

interface OperationalMetricsData {
    paymentMethodDistribution: PaymentMethodItem[];
    deliveryPerformance: DeliveryPerformanceItem[];
    refundCancellationRates: RefundCancellationItem[];
    peakHours: PeakHoursItem[];
}

type OperationalMetricsProps = {
    data: OperationalMetricsData;
};

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function OperationalMetrics({ data }: OperationalMetricsProps) {
    const t = useTranslations();

    // Transform payment method data
    const paymentData = data.paymentMethodDistribution.map((item: PaymentMethodItem, index: number) => ({
        name: item._id || "Unknown",
        count: item.count,
        totalAmount: item.totalAmount,
        avgAmount: item.avgAmount,
        color: COLORS[index % COLORS.length]
    }));

    // Transform peak hours data
    const peakHoursData = data.peakHours.slice(0, 20).map((item: PeakHoursItem) => ({
        time: `${item._id}:00`,
        orderCount: item.orderCount,
        avgOrderValue: item.avgOrderValue
    }));

    // Calculate delivery metrics
    const deliveryMetrics = data.deliveryPerformance && data.deliveryPerformance.length > 0
        ? {
            totalOrders: data.deliveryPerformance.reduce((sum, item) => sum + item.count, 0),
            deliveredOrders: data.deliveryPerformance
                .filter(item => item._id === "delivered")
                .reduce((sum, item) => sum + item.count, 0)
        }
        : { totalOrders: 0, deliveredOrders: 0 };

    const deliveryRate = deliveryMetrics.totalOrders > 0
        ? ((deliveryMetrics.deliveredOrders / deliveryMetrics.totalOrders) * 100).toFixed(1)
        : 0;

    // Calculate refund metrics

    // @ts-expect-error
    const refundMetrics = data.refundMetrics;
    const cancellationRate = refundMetrics.totalOrders > 0
        ? ((refundMetrics.cancelledOrders / refundMetrics.totalOrders) * 100).toFixed(1)
        : 0;
    const refundRate = refundMetrics.totalOrders > 0
        ? ((refundMetrics.refundedOrders / refundMetrics.totalOrders) * 100).toFixed(1)
        : 0;
    const failureRate = refundMetrics.totalOrders > 0
        ? ((refundMetrics.failedOrders / refundMetrics.totalOrders) * 100).toFixed(1)
        : 0;


        console.log(deliveryMetrics)

    return (
        <div className="space-y-8 mb-20">
            {/* Key Metrics Cards
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("delivery-rate")}</h3>
                    <p className="text-3xl font-bold text-green-600">{deliveryRate}%</p>
                    <p className="mt-1 text-sm text-gray-600">
                        {deliveryMetrics.deliveredOrders} / {deliveryMetrics.totalOrders} {t("orders")}
                    </p>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-red-800">{t("cancellation-rate")}</h3>
                    <p className="text-3xl font-bold text-red-600">{cancellationRate}%</p>
                    <p className="mt-1 text-sm text-gray-600">
                        {refundMetrics.cancelledOrders} {t("cancelled-orders")}
                    </p>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-yellow-800">{t("refund-rate")}</h3>
                    <p className="text-3xl font-bold text-yellow-600">{refundRate}%</p>
                    <p className="mt-1 text-sm text-gray-600">
                        {refundMetrics.refundedOrders} {t("refunded-orders")}
                    </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">{t("failure-rate")}</h3>
                    <p className="text-3xl font-bold text-gray-600">{failureRate}%</p>
                    <p className="mt-1 text-sm text-gray-600">
                        {refundMetrics.failedOrders} {t("failed-orders")}
                    </p>
                </div>
            </div> */}

            {/* Payment Method Distribution */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("payment-method-distribution")}</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Payment Method Pie Chart */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("payment-methods")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={paymentData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {paymentData.map((entry, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Payment Method Revenue Chart */}
                    <div>
                        <h3 className="mb-4 text-center text-lg font-semibold text-green-700">{t("revenue-by-payment-method")}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={paymentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                    dataKey="totalAmount"
                                    fill="#10b981"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Peak Hours Analysis */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("peak-hours-analysis")}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={peakHoursData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="time"
                            tick={{ fill: "#374151", fontSize: 10 }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <YAxis
                            tick={{ fill: "#374151" }}
                            axisLine={{ stroke: "#6b7280" }}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                value,
                                name === "orderCount" ? t("orders") : t("revenue")
                            ]}
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

            {/* Payment Method Details Table */}
            <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-green-800">{t("payment-method-details")}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-green-200">
                                <th className="px-4 py-3 text-left font-semibold text-green-800">{t("payment-method")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("orders")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("total-amount")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("avg-amount")}</th>
                                <th className="px-4 py-3 text-right font-semibold text-green-800">{t("percentage")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((item, index: number) => {
                                const totalOrders = paymentData.reduce((sum: number, p) => sum + p.count, 0);
                                const percentage = ((item.count / totalOrders) * 100).toFixed(1);

                                return (
                                    <tr key={index} className="border-b border-green-100 hover:bg-green-50">
                                        <td className="px-4 py-3 text-gray-700">{item.name}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">{item.count}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                                            ${item.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700">
                                            ${item.avgAmount.toFixed(2)}
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

        </div>
    );
}

export default OperationalMetrics;
