"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function TestSentryPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const triggerServerError = async () => {
        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch("/api/test-sentry");
            const data = await response.json();

            if (response.ok) {
                setResult(data.message);
            } else {
                setError(data.error || "Server error occurred");
            }
        } catch (err) {
            setError("Network error occurred");
            console.error("Fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerClientError = () => {
        // Create a client-side error
        const error = new Error("🚨 Client-side test error for Sentry!");
        error.name = "ClientSentryTestError";

        // Add some context
        Sentry.setContext("client_test", {
            user_action: "button_click",
            page: "test-sentry",
            timestamp: new Date().toISOString()
        });

        Sentry.setTag("error_location", "client_side");

        // Capture the error
        Sentry.captureException(error);

        setResult("Client-side error sent to Sentry!");
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        🚨 Sentry Test Page
                    </h1>
                    <p className="mb-6 text-gray-600">
                        Test your Sentry error tracking setup
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={triggerServerError}
                            disabled={isLoading}
                            className="w-full rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:bg-gray-400"
                        >
                            {isLoading ? "Sending..." : "Trigger Server Error"}
                        </button>

                        <button
                            onClick={triggerClientError}
                            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            Trigger Client Error
                        </button>
                    </div>

                    {result && (
                        <div className="mt-4 rounded-md border border-green-400 bg-green-100 p-3 text-green-700">
                            ✅ {result}
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 rounded-md border border-red-400 bg-red-100 p-3 text-red-700">
                            ❌ {error}
                        </div>
                    )}

                    <div className="mt-6 text-sm text-gray-500">
                        <p>Check your Sentry dashboard at:</p>
                        <a
                            href="https://unemployed-7m.sentry.io/issues/?project=4510058162290768"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            Sentry Issues Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
