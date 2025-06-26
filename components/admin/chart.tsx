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

type ChartPropsType = {
  data: {
    date: string;
    count: number;
  }[];
};

function Chart({ data }: ChartPropsType) {
    
    const t = useTranslations()

  return (
    <section className='mt-24'>
      <h1 className='text-center text-4xl font-semibold text-custom-brown'>{t("monthly-orders")}</h1>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#4A1F0D' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
export default Chart;