export async function HandleSpecificCategory(_id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${_id}`,
      {
        next: { revalidate: 60 }
      }
    );

    const result = await response.json();
    return result?.data;

  } catch (error) {
    return error;
  }
}