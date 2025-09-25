import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Simulate some processing
        await new Promise(resolve => setTimeout(resolve, 100));

        // Create a test error with some context
        const error = new Error("🚨 Test Error: Sentry is working perfectly!");
        error.name = "SentryTestError";

        // Add some context to the error
        Sentry.setContext("test_info", {
            timestamp: new Date().toISOString(),
            user_agent: "Test User",
            test_type: "manual_verification",
            environment: process.env.NODE_ENV || "development"
        });

        // Set a custom tag
        Sentry.setTag("error_source", "test_endpoint");

        // Capture the error
        Sentry.captureException(error);

        return NextResponse.json({
            success: true,
            message: "Test error has been sent to Sentry! Check your dashboard.",
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        // This would also be captured by Sentry automatically
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
