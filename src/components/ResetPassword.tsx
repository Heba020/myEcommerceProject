"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ResetPassword }
from "@/src/apis/Auth/ResetPassword.api";

export default function ResetPasswordComponent() {

  const router = useRouter();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const email =
        localStorage.getItem("resetEmail");

      if (!email) {
        setMessage("Missing email");
        return;
      }

      const result = await ResetPassword(
        email,
        password
      );

      if (result.token) {

        setMessage("Password reset successful");

        localStorage.removeItem("resetEmail");

        router.push("/login");

      } else {

        setMessage(result.message);
      }

    } catch (error) {

      console.log(error);

      setMessage("Something went wrong");

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-2xl shadow">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Reset Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-xl p-3 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-xl"
        >

          {loading
            ? "Resetting..."
            : "Reset Password"}

        </button>

      </form>

      {message && (

        <p className="mt-5 text-center text-green-500">
          {message}
        </p>

      )}

    </div>
  );
}