'use server'

import { getAuthToken } from "@/src/AuthToken";


export async function ClearCart() {
const token = await getAuthToken();


 if (!token) {
    throw new Error("Unauthorized");
 }

  const data = await fetch
  (`${process.env.APICart}`,
    {
        cache: "no-store",
        method: "DELETE",
        headers: {
        token: token,
        "Content-Type": "application/json",
        },
   }
);

const payload = await data.json();

return payload;
}