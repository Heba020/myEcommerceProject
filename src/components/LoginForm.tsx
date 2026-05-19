"use client";

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormField
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  loginSchema,
  loginSchemaValidation
} from '@/src/schema/login.schema'

import { signIn } from 'next-auth/react'

import Link from "next/link";

import toast from 'react-hot-toast'

export default function LoginForm() {

  const [LoadingSpinner, setLoadingSpinner] =
    useState(false);

  const form = useForm<loginSchemaValidation>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

async function wSubmit(
  data: loginSchemaValidation
) {

  setLoadingSpinner(true);

  const params =
    new URLSearchParams(window.location.search);

  const redirect =
    params.get("redirect");

  const response = await signIn(
    "credentials",
    {
      email: data.email,
      password: data.password,
      redirect: false,
    }
  );

  if (response?.ok) {

    toast.success(
      "Logged in successfully!"
    );

    window.location.href =
      redirect
        ? `/${redirect}`
        : "/";

  } else {

    toast.error(
      response?.error ||
      "Login failed. Please check your Password or/and Email."
    );
  }

  setLoadingSpinner(false);
}

  return (
    <>

      <Form {...form}>

        <form
          className='w-1/2 mx-auto'
          onSubmit={form.handleSubmit(wSubmit)}
        >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <br />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                    autoComplete='off'
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <br />

          <Button
            type="submit"
            className='bg-green-400 hover:bg-green-200 hover:text-black ms-auto block text-white'
          >

            {LoadingSpinner ? (
              <i className="fas fa-spinner fa-spin text-white"></i>
            ) : (
              "Login"
            )}

          </Button>

          <Button
            className="bg-green-400 text-sm hover:bg-green-200 mt-3"
          >

            <Link href="/forgot-password">

              <p className='text-white hover:text-black'>
                Forgot Password
              </p>

            </Link>

          </Button>

        </form>

      </Form>

    </>
  );
}