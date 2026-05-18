"use server";

import { getAuthToken } from "@/src/AuthToken";

export async function GetWishlist() {

  try {

    const token = await getAuthToken();

  if (!token) {
    return [];
  }


    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
      {
        cache: "no-store",
        headers: {
          token,
        },
      }
    );

    const result = await response.json();

    return result.data;

  } catch (error) {
    console.log(error);
  }
}