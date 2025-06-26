import { AlertCircle } from "lucide-react";

type FeedBackMessageProps = {
  children?: React.ReactNode;
};

export default function FeedBackMessage({ children }: FeedBackMessageProps) {
  if (!children) return null;
  return (
    <p className="items-center justify-center gap-1 text-center text-sm font-semibold text-red-500">
      <AlertCircle size={15} /> {children}
    </p>
  );
}
