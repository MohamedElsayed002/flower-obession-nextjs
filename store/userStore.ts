import { User } from "@/utils/types/user";
import { create } from "zustand";
import { GetUserInfo } from "@/utils/actions";
import { verifyFirebaseTokenWithBackend } from "@/utils/actions/auth/firebase-verify-action";

interface UserState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  fetchFirebaseUser: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const userInfo = await GetUserInfo();
      set({ user: userInfo, loading: false });
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ loading: false });
    }
  },

  fetchFirebaseUser: async () => {
    try {
      const result = await verifyFirebaseTokenWithBackend();
      console.log('Firebase verification result:', result);

      if (result.success) {
        // Update the access token with our JWT token
        if (result.access_token) {
          document.cookie = `access_token=${result.access_token}; path=/; secure; samesite=strict`;
          console.log('JWT token stored in cookies');
        }

        // Store the user data
        set({ user: result.user, loading: false });
        console.log('Firebase user data stored:', result.user);
      } else {
        console.error('Firebase user verification failed:', result.error);
        set({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Error fetching Firebase user:', error);
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user }),




  clearUser: () => set({
    user: null,
    loading: false
  }),

}));
