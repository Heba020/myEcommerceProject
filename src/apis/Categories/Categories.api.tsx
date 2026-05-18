export async function HandleCategories() {
    try{
        const categories = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/categories`, {next: { revalidate: 60 }});
        const result = await categories.json();
        return result?.data;
    }catch (error){return error}
    
}