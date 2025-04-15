import { User } from "@/utils/types/user";
import { create } from "zustand";
import { GetUserInfo } from "@/utils/actions";

interface UserState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true, // Start in a loading state
  fetchUser: async () => {
    const userInfo = await GetUserInfo();
    set({ user: userInfo, loading: false });
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, loading: false }),
}));
