import { NextResponse } from "next/server";
import { getAuthToken } from "@/src/AuthToken";
import { jwtDecode } from "jwt-decode";

export async function GET() {
  const token = await getAuthToken();

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const decoded = jwtDecode<{ id: string }>(token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${decoded.id}`,
    {
      headers: {
        token,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}