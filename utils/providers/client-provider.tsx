"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(); // ✅ Fetch user globally when the app loads
  }, [fetchUser]);

  return <>{children}</>;
}
