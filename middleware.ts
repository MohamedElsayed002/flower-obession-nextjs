import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; // Your next-intl routing config

// Create internationalization middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  // Get token from Cookies OR Authorization Header
  const token =
    req.cookies.get("access_token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", ""); // Extract token from header

  const { pathname } = req.nextUrl; // Get the current route

  // Extract locale from pathname (e.g., "/en/cart" -> "en")
  const localeMatch = pathname.match(/^\/(ar|en)\//);
  const locale = localeMatch ? localeMatch[1] : "en"; // Default to "en" if no locale is found

  // Define protected routes
  const protectedRoutes = ["/cart", "/favorite","/checkout","/profile","/orders","/admin"];
  
  // Define auth-related routes
  const authRoutes = ["/login", "/register", "/forgot-password"];

  // Prevent authenticated users from accessing auth routes
  if (token && authRoutes.some(route => pathname.includes(route))) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url)); // Redirect to home or dashboard
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!token && protectedRoutes.some(route => pathname.includes(route))) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // Call next-intl middleware to handle language routing
  return intlMiddleware(req);
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/", "/(ar|en)/:path*"], // Match localized paths
};
