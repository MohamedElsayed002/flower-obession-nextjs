import { Book, BookOpenText, Boxes, Package2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const services = [
  { key: "tailorMade", icon: <Boxes /> },
  { key: "expressShipping", icon: <Package2 /> },
  { key: "nationwideShipping", icon: <BookOpenText /> },
  { key: "stationeryPrinting", icon: <Book /> }
];

function ServiceItem({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-custom-yellow-2 p-2">
        {icon}
      </div>
      <div>
        <h1 className="mb-1 text-xl font-bold text-custom-brown">{title}</h1>
        <p className="text-sm text-custom-brown-2">{description}</p>
      </div>
    </div>
  );
}

export default function HomeComponent7() {
  const t = useTranslations("home");

  return (
    <div className="my-10 mb-32 grid grid-cols-1 md:grid-cols-2  md:gap-20">
      <div className="my-20 grid h-56 grid-cols-2 gap-5">
        {services.map((service) => (
          <ServiceItem
            key={service.key}
            title={t(`${service.key}.title`)}
            description={t(`${service.key}.description`)}
            icon={service.icon}
          />
        ))}
      </div>
      <div className="relative mt-40 md:mt-0">
        <Image
          src="/flower-water.png"
          className="object-cover"
          width={500}
          height={500}
          alt="flower water"
        />
        <Image
          className="absolute -bottom-20 -z-10 ltr:-left-20"
          src="/shape-3.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          className="absolute -bottom-10 -z-10 ltr:left-20"
          src="/shape2.png"
          alt="shape"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
