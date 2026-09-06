import Link from "next/link";
import { Button } from "@charm/ui/button";

/**
 * Returns a real 404 status, unlike the old SPA which served 200 for every
 * unknown path and let search engines index soft-404 pages.
 */
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24 text-foreground">
          <div className="mx-auto max-w-md text-center">
            <p className="text-gradient font-display text-7xl font-bold">404</p>
            <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
            <p className="mt-3 text-muted-foreground">
              The page you are looking for does not exist or has moved.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">Browse projects</Link>
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
