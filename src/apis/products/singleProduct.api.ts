


export async function handleSingleProducts(_id: string) {
  try {
    const products = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${_id}`,
      { cache: "no-store" },
    );
    const result = await products.json();
    return result?.data;
  } catch (error) {
    return error;
  }
}
