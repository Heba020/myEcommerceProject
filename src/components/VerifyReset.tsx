"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { VerifyResetCode }
from "../apis/Auth/ResetCode.api";

export default function VerifyResetCodeComponent() {

  const router = useRouter();

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const result =
        await VerifyResetCode(code);

      if (result.status === "Success") {

        setMessage("Code verified successfully");

        router.push("/reset-password");

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
        Verify Reset Code
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Enter reset code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-xl p-3 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-xl"
        >

          {loading
            ? "Verifying..."
            : "Verify Code"}

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