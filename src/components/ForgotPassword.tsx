"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ForgotPassword } from "@/src/apis/Auth/ForgotPassword.api";

export default function ForgotPasswordComponent() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const result = await ForgotPassword(email);

      if (result.statusMsg === "success") {

        localStorage.setItem("resetEmail", email);

        setMessage("Reset code sent successfully");

        router.push("/verify-reset-code");

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
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

        {/* Icon */}
        <div className="text-center mb-6">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">

            <i className="fa-solid fa-lock text-4xl text-green-500"></i>

          </div>

        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-3">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your email and we will send you a reset code.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-green-500"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-xl font-semibold"
          >

            {loading
              ? "Sending..."
              : "Send Reset Code"}

          </button>

        </form>

        {/* Message */}
        {message && (

          <p className="mt-6 text-center text-green-500">
            {message}
          </p>

        )}

      </div>

    </div>
  );
}