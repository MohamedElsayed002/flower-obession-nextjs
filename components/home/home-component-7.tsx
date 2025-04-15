import Image from "next/image";
import { useTranslations } from "next-intl";
import { Book, BookOpenText, Boxes, Package2 } from "lucide-react";

const services = [
  { key: "tailorMade", icon: <Boxes /> },
  { key: "expressShipping", icon: <Package2 /> },
  { key: "nationwideShipping", icon: <BookOpenText /> },
  { key: "stationeryPrinting", icon: <Book /> },
];

function ServiceItem({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="w-10 h-10 p-2 bg-custom-yellow-2 rounded-full flex justify-center items-center">
        {icon}
      </div>
      <div>
        <h1 className="mb-1 text-custom-brown text-xl font-bold">{title}</h1>
        <p className="text-sm text-custom-brown-2">{description}</p>
      </div>
    </div>
  );
}

export default function HomeComponent7() {
  const t = useTranslations("home");

  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 mb-32  md:gap-20">
      <div className="grid grid-cols-2 gap-5 h-56 my-20">
        {services.map((service) => (
          <ServiceItem
            key={service.key}
            title={t(`${service.key}.title`)}
            description={t(`${service.key}.description`)}
            icon={service.icon}
          />
        ))}
      </div>
      <div className="mt-40 md:mt-0 relative">
        <Image
          src="/flower-water.png"
          className="object-cover"
          width={500}
          height={500}
          alt="flower water"
        />
        <Image
          className="absolute -z-10 -bottom-20 ltr:-left-20"
          src="/shape-3.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          className="absolute -z-10 -bottom-10 ltr:left-20"
          src="/shape2.png"
          alt="shape"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
