"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="min-h-screen grid place-items-center">
          {/* Headline */}
          <h1 className="text-red-500 text-5xl font-bold">Error</h1>

          {/* Message */}
          <p className="mt-4 ">{error.message}</p>

          {/* Try again */}
          <div className="mt-4 flex justify-center">
            <Button variant="destructive" onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
