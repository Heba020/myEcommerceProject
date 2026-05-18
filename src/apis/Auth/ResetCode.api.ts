"use server";

export async function VerifyResetCode(
  resetCode: string
) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyResetCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetCode,
      }),
    }
  );

  return await response.json();
}