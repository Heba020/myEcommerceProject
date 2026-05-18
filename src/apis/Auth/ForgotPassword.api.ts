"use server";

export async function ForgotPassword(email: string) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPasswords`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  return await response.json();
}