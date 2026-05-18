"use server";

import { getAuthToken } from "@/src/AuthToken";

export async function addToWishlist(productId: string) {

  const token = await getAuthToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    }
  );

  const payload = await response.json();

  return payload;
}