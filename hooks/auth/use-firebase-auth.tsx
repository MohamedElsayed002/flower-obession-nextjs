"use client";

import { useMutation } from "@tanstack/react-query";
import { signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "@/utils/lib/firebase";
import { useLocale } from "next-intl";
import { useUserStore } from "@/store/userStore";
import { FirebaseUser } from "@/utils/types/firebase-user";
import Cookies from "js-cookie";

interface FirebaseAuthResult {
    user: User;
    accessToken: string;
}

export function useFirebaseAuth() {
    const locale = useLocale();
    const { fetchFirebaseUser } = useUserStore();

    return useMutation({
        mutationFn: async (): Promise<FirebaseAuthResult> => {
            try {
                const result = await signInWithPopup(auth, googleProvider);
                const accessToken = await result.user.getIdToken();

                return {
                    user: result.user,
                    accessToken,
                };
            } catch (error: any) {
                throw new Error(error.message || "Firebase authentication failed");
            }
        },
        onSuccess: async (data) => {
            try {
                // Store the Firebase token in cookies temporarily
                Cookies.set("access_token", data.accessToken, {
                    expires: 7,
                    secure: true,
                    sameSite: "Strict"
                });

                // Store user info in localStorage for easy access
                localStorage.setItem("firebase_user", JSON.stringify({
                    uid: data.user.uid,
                    email: data.user.email,
                    name: data.user.displayName,
                    photoURL: data.user.photoURL
                }));


                // Verify with backend and get user data
                await fetchFirebaseUser();

                // Redirect to complete profile page
                window.location.href = `/${locale}/`;
            } catch (error) {
                console.error('Error in Firebase auth success handler:', error);
            }
        },
        onError: (error) => {
            console.error("Firebase Auth Error:", error);
        }
    });
}
