import { redirect } from "next/navigation"
import { getUserOrder } from "@/utils/actions"
import { OrdersResponse } from "@/utils/types/orders"
import type { Metadata } from "next";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EmptyCart from "@/components/common/empty-cart"
import { getTranslations, getLocale } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
  
    return {
      title: t("orders"),
      description: t("orders-description"),
    };
  }

export default async function OrdersPage() {
    const locale = await getLocale();
    const t = await getTranslations();

    let data: OrdersResponse | null = null;

    try {
        data = await getUserOrder();
    } catch (error) {
        console.error("Error fetching orders:", error);
    }

    if (!Array.isArray(data)) {
        redirect(`/${locale}/login`);
    }

    if (data.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div dir={locale === "ar" ? "rtl" : "ltr"}>
            <Table>
                <TableCaption>{t('a-list-of-your-orders')}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('order-0')}</TableHead>
                        <TableHead>{t('shipping-address')}</TableHead>
                        <TableHead>{t('payment-method')}</TableHead>
                        <TableHead>{t('payment-status')}</TableHead>
                        <TableHead>{t('total-price-0')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.shippingAddress.street}</TableCell>
                            <TableCell>{item.paymentMethod}</TableCell>
                            <TableCell>{item.isPaid === true ? t('paid') : t('no-paid')}</TableCell>
                            <TableCell>${item.totalOrderPrice}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
