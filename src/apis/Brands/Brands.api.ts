


export async function HandleBrands() {
  try {
    const products = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brands`,
      { next: { revalidate: 60 }},
    );
    const result = await products.json();
    return result?.data;
  } catch (error) {
    return error;
  }
}
