import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function proxy(request: NextRequest) {

   const token = await getToken({req:request, secret: process.env.BETTER_AUTH_SECRET});

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

 
export const config = {
  matcher: ["/cart/:path*"]
}