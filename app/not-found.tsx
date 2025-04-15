import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <html>
      <body>
        <main className="min-h-screen grid place-items-center items-center">
          {/* Message */}
          <h1 className="text-4xl text-red-500 font-bold">
            This page was not found 😔
          </h1>

          {/* Homepage link */}
          <Button className=" mt-5" variant="destructive" asChild>
            <Link href="/"> Go back to Homepage</Link>
          </Button>
        </main>
      </body>
    </html>
  );
}
