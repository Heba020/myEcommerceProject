'use server'
import { getAuthToken } from "@/src/AuthToken";

export type ShippingAddress = {
    city: string;
    details: string;
    phone: string;
}

export default async function OnlinePay(cartId:string,shippingAddress:ShippingAddress) 
{
    const token = await getAuthToken()
    if (!token) {
        throw new Error('User is not authenticated');
      }
const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/checkout-session/${cartId}?url=https://my-ecommerce-project-git-main-heba020s-projects.vercel.app`,
    {
        method: 'POST',
        body: JSON.stringify({shippingAddress}),
        cache: 'no-store',
        headers: { token }
    })
const payload = await data.json()
return payload;

}
