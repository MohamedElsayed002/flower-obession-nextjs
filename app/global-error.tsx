"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* Your Error component here... */}
      </body>
    </html>
  );
}


// "use client";

// import { Button } from "@/components/ui/button";

// export default function GlobalError({
//   error,
//   reset
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   return (
//     <html>
//       <body>
//         <main className="grid min-h-screen place-items-center">
//           {/* Headline */}
//           <h1 className="text-5xl font-bold text-red-500">Error</h1>

//           {/* Message */}
//           <p className="mt-4 ">{error.message}</p>

//           {/* Try again */}
//           <div className="mt-4 flex justify-center">
//             <Button variant="destructive" onClick={() => reset()}>
//               Try again
//             </Button>
//           </div>
//         </main>
//       </body>
//     </html>
//   );
// }
