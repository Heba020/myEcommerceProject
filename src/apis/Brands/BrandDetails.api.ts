export async function HandleSpecificBrand(_id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brands/${_id}`,
      {
        next: { revalidate: 60 }
      }
    );

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log(error);
  }
}