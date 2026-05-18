"use client";

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormField
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { zodResolver }
from '@hookform/resolvers/zod';

import {
  registerSchema,
  registerSchemaValidation
} from '@/src/schema/register.schema';

import toast from 'react-hot-toast';

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
    }
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

    } catch (error) {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoadingSpinner(false);
    }
  }

  return (
    <>

      <Form {...form}>

        <form
          className='w-1/2 mx-auto'
          onSubmit={form.handleSubmit(wSubmit)}
        >

          {/* Username */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Username
                </FormLabel>

                <FormControl>

                  <div>

                    <Input
                      placeholder="username"
                      {...field}
                    />

                  </div>

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <br />

          {/* Email */}
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

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Password
                </FormLabel>

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

          {/* RePassword */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Re-enter Password
                </FormLabel>

                <FormControl>

                  <Input
                    type="password"
                    placeholder="re-enter password"
                    {...field}
                    autoComplete='off'
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <br />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Phone Number
                </FormLabel>

                <FormControl>

                  <Input
                    type="tel"
                    placeholder="phone number"
                    {...field}
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <br />

          {/* Submit */}
          <Button
            type="submit"
            className='bg-green-400 hover:bg-green-200 hover:text-black ms-auto block text-white'
          >

            {LoadingSpinner ? (
              <i className="fas fa-spinner fa-spin text-white"></i>
            ) : (
              "Register"
            )}

          </Button>

        </form>

      </Form>

    </>
  );
}