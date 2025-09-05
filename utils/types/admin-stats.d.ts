// Enhanced Admin Stats Types
declare type TopCustomer = {
    _id: string;
    totalSpent: number;
    orderCount: number;
    lastOrderDate: string;
    userId: string;
    name: string;
    email: string;
}

declare type TopProduct = {
    _id: string;
    totalQuantitySold: number;
    totalRevenue: number;
    orderCount: number;
    productId: string;
    productName: string;
    currentPrice: number;
    currentStock: number;
}

declare type LowStockProduct = {
    _id: string;
    price: number;
    category: string;
    productId: string;
    productName: string;
    currentStock: number;
}

declare type OrderStatusDistribution = {
    _id: string;
    count: number;
}

declare type RecentOrder = {
    _id: string;
    paymentMethod: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    itemCount: number;
}

declare type FetchAdminStats = {
    users: number;
    products: number;
    totalOrders: number;
    paidOrders: number;
    totalRevenue: number;
    monthlyRevenue: number;
    averageOrderValue: number;
    topCustomers: TopCustomer[];
    newUsersThisMonth: number;
    topProducts: TopProduct[];
    lowStockProducts: LowStockProduct[];
    orderStatusDistribution: OrderStatusDistribution[];
    recentOrders: RecentOrder[];
    conversionRate: number;
}

declare type FetchChartData = {
    date: string;
    count: number;
}

type DateCountResponse = FetchChartData[]

// Revenue Analytics Types
declare type MonthlyRevenueData = {
    _id: {
        year: number;
        month: number;
    };
    revenue: number;
    orderCount: number;
    date: string;
}

declare type DailyRevenueData = {
    _id: {
        year: number;
        month: number;
        day: number;
    };
    revenue: number;
    orderCount: number;
    date: string;
}

declare type RevenueAnalyticsResponse = {
    monthlyRevenue: MonthlyRevenueData[];
    dailyRevenue: DailyRevenueData[];
}