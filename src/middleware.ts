import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@utils/session";
import { EUser } from "@dtos/db";

const publicRoutes = [
  "/home/login",
  "/home/api/account/login",
  "/home/api/init",
];
// https://nextjs.org/docs/app/building-your-application/authentication#optimistic-checks-with-middleware-optional
export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;

  // Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect to /home/login if the user is not authenticated
  if (
    !publicRoutes.includes(path) &&
    (!session?.[EUser.ID] || !session?.[EUser.Role])
  ) {
    return NextResponse.redirect(new URL("/home/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
