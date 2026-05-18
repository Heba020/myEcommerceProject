
export async function getOrders(userId: string) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`,
    {
      headers: {
        token: localStorage.getItem("userToken") || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}