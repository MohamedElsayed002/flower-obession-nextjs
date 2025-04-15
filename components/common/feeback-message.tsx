import { AlertCircle } from "lucide-react";

type FeedBackMessageProps = {
  children?: React.ReactNode;
};

export default function FeedBackMessage({ children }: FeedBackMessageProps) {
  if (!children) return null;
  return (
    <p className="text-center text-red-500 items-center gap-1 font-semibold text-sm justify-center">
      <AlertCircle size={15} /> {children}
    </p>
  );
}
