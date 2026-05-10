import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {

  const token = await getToken({
    req,
    secret: process.env.BETTER_AUTH_SECRET
  });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.APICart}`, {
    headers: {
      token: token.token,
      "Content-Type": 'application/json'
    }
  });

  const data = await res.json();

  return NextResponse.json(data);
}