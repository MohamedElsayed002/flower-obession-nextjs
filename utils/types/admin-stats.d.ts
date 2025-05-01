declare type FetchAdminStats = {
    orders : number;
    products: number;
    users: number
}

declare type FetchChartData = {
    date : string;
    count: number;
}

type DateCountResponse = FetchChartData[]