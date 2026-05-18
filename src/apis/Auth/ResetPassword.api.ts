"use server";

export async function ResetPassword(
  email: string,
  newPassword: string
) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        newPassword,
      }),
    }
  );

  return await response.json();
}