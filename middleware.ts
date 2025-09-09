import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from "next/server";

export const runtime = "nodejs";


export async function middleware(request: { url: string | URL | undefined }) {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.redirect(
      new URL(`/api/auth/login?post_login_redirect_url=${encodeURIComponent(request.url?.toString() || '/dashboard')}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/calendar/:path*',
    '/company',
    '/CompanyDashboard/:path*',
  ],
};
