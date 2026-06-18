"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  registerSchemaValidation,
} from "@/src/schema/register.schema";

import toast from "react-hot-toast";

import { Berkshire_Swash } from "next/font/google";

const berkshireSwash = Berkshire_Swash({
  subsets: ["latin"],
  weight: "400",
});

export default function RegisterForm() {
  const router = useRouter();

  const [LoadingSpinner, setLoadingSpinner] =
    useState(false);

  const form = useForm<registerSchemaValidation>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phoneNumber: "",
    },
  });

  async function wSubmit(
    data: registerSchemaValidation
  ) {
    try {
      setLoadingSpinner(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            rePassword: data.rePassword,
            phone: data.phoneNumber,
          }),
        }
      );

      const result = await response.json();

      if (result.message === "success") {
        toast.success(
          "Account created successfully!"
        );

        router.push("/login");
      } else {
        toast.error(
          result.message ||
            "Registration failed"
        );
      }
    } catch {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoadingSpinner(false);
    }
  }

return (
  <div
    className="
      mx-auto
      bg-white
      border
      border-2
      shadow-[0_0_30px_rgba(21,128,61,0.4)]
      rounded-2xl
      py-10
      px-8

      lg:w-[900px]
      md:w-[650px]
      sm:w-[550px]
      w-[400px]
    "
  >
    <h2
      className={`
        text-5xl
        text-center
        mb-12
        font-bold
        text-neutral-800
        ${berkshireSwash.className}
      `}
    >
      Create Account
    </h2>

    <Form {...form}>
      <form
        className="
          w-full
          md:w-3/4
          mx-auto
          space-y-5
        "
        onSubmit={form.handleSubmit(
          wSubmit
        )}
      >
        {/* Username */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="
                  block
                  mb-2
                  font-semibold
                  text-neutral-700
                "
              >
                Username
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  className="
                    focus-visible:ring-2
                    focus-visible:ring-green-700
                    focus-visible:ring-offset-0
                    focus-visible:border-green-700
                    transition-all
                    duration-200
                  "
                />
              </FormControl>

              <FormMessage
                className="
                  mt-2
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-red-700
                  shadow-sm
                "
              />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="
                  block
                  mb-2
                  font-semibold
                  text-neutral-700
                "
              >
                Email
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  {...field}
                  className="
                    focus-visible:ring-2
                    focus-visible:ring-green-700
                    focus-visible:ring-offset-0
                    focus-visible:border-green-700
                    transition-all
                    duration-200
                  "
                />
              </FormControl>

              <FormMessage
                className="
                  mt-2
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-red-700
                  shadow-sm
                "
              />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="
                  block
                  mb-2
                  font-semibold
                  text-neutral-700
                "
              >
                Password
              </FormLabel>

              <FormControl>
                <Input
                  type="password"
                  autoComplete="off"
                  {...field}
                  className="
                    focus-visible:ring-2
                    focus-visible:ring-green-700
                    focus-visible:ring-offset-0
                    focus-visible:border-green-700
                    transition-all
                    duration-200
                  "
                />
              </FormControl>

              <FormMessage
                className="
                  mt-2
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-red-700
                  shadow-sm
                "
              />
            </FormItem>
          )}
        />

        {/* Re-enter Password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="
                  block
                  mb-2
                  font-semibold
                  text-neutral-700
                "
              >
                Re-enter Password
              </FormLabel>

              <FormControl>
                <Input
                  type="password"
                  autoComplete="off"
                  {...field}
                  className="
                    focus-visible:ring-2
                    focus-visible:ring-green-700
                    focus-visible:ring-offset-0
                    focus-visible:border-green-700
                    transition-all
                    duration-200
                  "
                />
              </FormControl>

              <FormMessage
                className="
                  mt-2
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-red-700
                  shadow-sm
                "
              />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="
                  block
                  mb-2
                  font-semibold
                  text-neutral-700
                "
              >
                Phone Number
              </FormLabel>

              <FormControl>
                <Input
                  type="tel"
                  {...field}
                  className="
                    focus-visible:ring-2
                    focus-visible:ring-green-700
                    focus-visible:ring-offset-0
                    focus-visible:border-green-700
                    transition-all
                    duration-200
                  "
                />
              </FormControl>

              <FormMessage
                className="
                  mt-2
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-red-700
                  shadow-sm
                "
              />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="
            w-full
            mt-4

            bg-green-700
            hover:bg-green-200

            border
            hover:border-green-700

            text-white
            hover:text-black

            font-semibold

            cursor-pointer

            transition-all
            duration-300
          "
        >
          {LoadingSpinner ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  </div>
);
}