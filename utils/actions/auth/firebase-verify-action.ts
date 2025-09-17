"use server";

import { cookies } from "next/headers";

export async function verifyFirebaseTokenWithBackend() {
    try {
        const firebaseToken = cookies().get("access_token")?.value;

        if (!firebaseToken) {
            return { success: false, error: "No Firebase token found" };
        }

        const response = await fetch(`${process.env.API}/auth/firebase-verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: firebaseToken }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                error: errorData.message || "Failed to verify Firebase token"
            };
        }

        const data = await response.json();
        return {
            success: true,
            access_token: data.access_token,
            user: data.user
        };
    } catch (error: any) {
        console.error('Firebase verification error:', error);
        return {
            success: false,
            error: error.message || "Failed to verify Firebase token"
        };
    }
}
