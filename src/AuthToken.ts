
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getAuthToken() {
  const cookieName = process.env.NODE_ENV === "production" ? '__Secure-next-auth.session-token':'next-auth.session-token'
    const authToken = (await cookies()).get(cookieName)?.value
    const token = await decode({ token: authToken, secret: process.env.NEXTAUTH_SECRET! })

return token?.token;


}