"use server";

import { getAuthToken } from "@/src/AuthToken";

export async function RemoveWishlist(productId: string) {

  try {

    const token = await getAuthToken();

  if (!token) {
    return [];
  }


    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token,
        },
      }
    );

    return await response.json();

  } catch (error) {
    console.log(error);
  }
}