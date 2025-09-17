"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export function useInitUser() {
    const {
        user,
        loading,
        fetchUser,
        fetchFirebaseUser
    } = useUserStore();

    useEffect(() => {
        // Only run if no user data is loaded and not currently loading
        if (!user && !loading) {
            // Check for Firebase user in localStorage first
            const storedFirebaseUser = localStorage.getItem("firebase_user");

            if (storedFirebaseUser) {
                console.log("Found Firebase user in localStorage, verifying with backend...");
                fetchFirebaseUser();
            } else {
                // Check for access token to determine if we should fetch user
                const accessToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('access_token='))
                    ?.split('=')[1];

                if (accessToken) {
                    console.log("Found access token, fetching user...");
                    fetchUser();
                } else {
                    console.log("No user data found, setting loading to false");
                    // Set loading to false if no user data is available
                    useUserStore.setState({ loading: false });
                }
            }
        }
    }, [user, loading, fetchUser, fetchFirebaseUser]);

    return { user, loading };
}
