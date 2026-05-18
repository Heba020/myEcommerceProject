"use client";
export async function generateMetadata() {
  return {
    title: "Error",
  };
}
export default function Error({
  error,
}: {
  error: Error;
}) {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Something went wrong
      </h1>

      <p>{error.message}</p>

    </div>
  );
}