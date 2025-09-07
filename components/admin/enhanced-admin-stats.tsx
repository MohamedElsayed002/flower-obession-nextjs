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

type EnhancedAdminStatsProps = {
    data: FetchAdminStats;
};

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function EnhancedAdminStats({ data }: EnhancedAdminStatsProps) {
    const t = useTranslations();

    // Transform data for charts
    const orderStatusData = data.orderStatusDistribution.map((item, index) => ({
        name: item._id,
        value: item.count,
        color: COLORS[index % COLORS.length]
    }));

    const topProductsData = data.topProducts.slice(0, 5).map(item => ({
        name: item.productName.length > 15 ? item.productName.substring(0, 15) + "..." : item.productName,
        revenue: item.totalRevenue,
        quantity: item.totalQuantitySold
    }));

    // const topCustomersData = data.topCustomers.slice(0, 5).map(item => ({
    //     name: item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name,
    //     spent: item.totalSpent,
    //     orders: item.orderCount
    // }));


    return (
        <div className="space-y-8">
            {/* Main Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("total-revenue")}</h3>
                    <p className="text-3xl font-bold text-green-600">${data.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("total-orders")}</h3>
                    <p className="text-3xl font-bold text-green-600">{data.totalOrders}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("users")}</h3>
                    <p className="text-3xl font-bold text-green-600">{data.users}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("conversion-rate")}</h3>
                    <p className="text-3xl font-bold text-green-600">{data.conversionRate.toFixed(1)}%</p>
                </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("paid-orders")}</h3>
                    <p className="text-2xl font-bold text-green-600">{data.paidOrders}</p>
                    <p className="mt-1 text-sm text-gray-600">
                        {((data.paidOrders / data.totalOrders) * 100).toFixed(1)}% of total
                    </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("monthly-revenue")}</h3>
                    <p className="text-2xl font-bold text-green-600">${data.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("average-order-value")}</h3>
                    <p className="text-2xl font-bold text-green-600">${data.averageOrderValue.toFixed(2)}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-lg font-semibold text-green-800">{t("new-users-this-month")}</h3>
                    <p className="text-2xl font-bold text-green-600">{data.newUsersThisMonth}</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Order Status Distribution */}
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-center text-xl font-semibold text-green-800">{t("order-status-distribution")}</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={orderStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {orderStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Products Revenue */}
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-center text-xl font-semibold text-green-800">{t("top-products-revenue")}</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topProductsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: "#374151", fontSize: 12 }}
                                axisLine={{ stroke: "#6b7280" }}
                            />
                            <YAxis
                                tick={{ fill: "#374151" }}
                                axisLine={{ stroke: "#6b7280" }}
                                tickFormatter={(value) => `$${value}`}
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
            </div>

            {/* Top Customers and Recent Orders */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Customers */}
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold text-green-800">{t("top-customers")}</h2>
                    <div className="space-y-4">
                        {data.topCustomers.slice(0, 5).map((customer) => (
                            <div key={customer._id} className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-green-800">{customer.name}</h3>
                                    <p className="text-sm text-gray-600">{customer.email}</p>
                                    <p className="text-sm text-gray-500">
                                        {customer.orderCount} {t("orders")} • {t("last-order")}: {new Date(customer.lastOrderDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-600">${customer.totalSpent.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="rounded-lg border border-green-200 bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold text-green-800">{t("recent-orders")}</h2>
                    <div className="space-y-3">
                        {data.recentOrders.slice(0, 5).map((order) => (
                            <div key={order._id} className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-green-800">{order.customerName}</h3>
                                    <p className="text-sm text-gray-600">{order.customerEmail}</p>
                                    <p className="text-sm text-gray-500">
                                        {order.itemCount} {t("items")} • {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-600">${order.totalAmount.toLocaleString()}</p>
                                    <div className="mt-1 flex gap-2">
                                        <span className={`rounded-full px-2 py-1 text-xs ${order.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {order.isPaid ? t("paid") : t("pending")}
                                        </span>
                                        <span className={`rounded-full px-2 py-1 text-xs ${order.isDelivered ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                            }`}>
                                            {order.isDelivered ? t("delivered") : t("processing")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Low Stock Alert */}
            {data.lowStockProducts.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                    <h2 className="mb-4 flex items-center text-xl font-semibold text-red-800">
                        <span className="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
                        {t("low-stock-alert")} ({data.lowStockProducts.length} {t("products")})
                    </h2>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {data.lowStockProducts.slice(0, 6).map((product) => (
                            <div key={product._id} className="flex items-center justify-between rounded-lg border border-red-200 bg-white p-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-red-800">{product.productName}</h3>
                                    <p className="text-sm text-gray-600">{t("category")}: {product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-red-600">{product.currentStock}</p>
                                    <p className="text-sm text-gray-500">{t("in-stock")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {data.lowStockProducts.length > 6 && (
                        <p className="mt-3 text-center text-sm text-red-600">
                            +{data.lowStockProducts.length - 6} {t("more-products")} {t("with-low-stock")}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default EnhancedAdminStats;
