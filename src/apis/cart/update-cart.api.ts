'use server'

import { getAuthToken } from "@/src/AuthToken";


export async function updateCart({productId,count}:{productId:string,count:number}) {
const token = await getAuthToken();


 if (!token) {
    throw new Error("Unauthorized");
 }

  const data = await fetch
  (`${process.env.APICart}/${productId}`,
    {
        cache: "no-store",
        method: "PUT",
        headers: {
        token: token,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({count}),

   }
);

const payload = await data.json();

return payload;

}

