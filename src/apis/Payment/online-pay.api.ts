'use server'

import { getAuthToken } from "@/src/AuthToken";

export type ShippingAddress = {
  city: string;
  details: string;
  phone: string;
};

export default async function OnlinePay(
  cartId: string,
  shippingAddress: ShippingAddress
) {

  const token = await getAuthToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout-session/${cartId}?url=https://my-ecommerce-project-phi-bay.vercel.app/allorders`,
    {
      method: "POST",

      cache: "no-store",

      headers: {
        token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        shippingAddress,
      }),
    }
  );

  const payload = await response.json();

  return payload;
}