


export async function handleSingleProducts(_id: string) {
  try {
    const products = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${_id}`,
      { next: { revalidate: 60 } },
    );
    const result = await products.json();
    return result?.data;
  } catch (error) {
    return error;
  }
}
