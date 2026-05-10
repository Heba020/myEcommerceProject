'use server'

import { getAuthToken } from "@/src/AuthToken";


export async function addToCart(productId: string) {
const token = await getAuthToken();


 if (!token) {
    throw new Error("Unauthorized");
 }

  const data = await fetch
  (`${process.env.APICart}`,
    {
        cache: "no-store",
        method: "POST",
        headers: {
        token: token,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({productId}),
   }
);

const payload = await data.json();

return payload;

}

