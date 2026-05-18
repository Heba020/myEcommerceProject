"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartResponse } from "../interfaces/cart.interface";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {

  // GET CART
  const { data } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {

      const res = await fetch("/api/cart");
      const data = await res.json();

      return data;
    },
  });

  // TOTAL ITEMS
  const products = data?.data?.products ?? [];

  const totalItems = products.reduce(
    (total, product) => total + product.count,
    0
  );

  // SESSION
  const { data: Session, status } = useSession();

  // TOGGLE
  const [Toggle, setToggle] = useState(true);

  function toggleMenu() {
    setToggle(!Toggle);
  }

  // LOGOUT
  function logout() {
    signOut({ callbackUrl: "/" });
  }

  // LINKS
  const links = [
    { path: "/products", content: "products" },
    { path: "/brands", content: "brands" },
    { path: "/categories", content: "categories" },

    ...(status === "authenticated"
      ? [{ path: "/allorders", content: "orders"},
        { path: "/WishList", content: "WishList" }
      ]
      : []),
  ];

  // AUTH
  const auth = [
    { path: "/login", content: "login" },
    { path: "/register", content: "register" },
  ];

  return (

    <nav
      className="
        sticky top-0 z-50
        w-full
        border-b border-gray-200
        bg-white/90
        backdrop-blur-lg
        shadow-sm
      "
    >

      <div
        className="
          max-w-screen-xl
          mx-auto
          flex flex-wrap lg:flex-nowrap
          items-center
          justify-between
          px-4
          py-4
        "
      >

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center me-10"
        >

          <Image
            width={180}
            height={100}
            quality={75}
            src="/freshcart-logo.svg"
            alt="freshcart logo"
            className="
              hover:scale-105
              transition-transform
              duration-300
            "
          />

        </Link>

        {/* TOGGLE BUTTON */}
        <button
          onClick={toggleMenu}
          type="button"
          className="
            lg:hidden
            flex items-center justify-center
            w-11 h-11
            rounded-2xl
            border border-gray-200
            bg-white
            text-green-600
            shadow-sm
            hover:bg-green-100
            transition-all duration-300
          "
        >

          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                Toggle
                  ? "M4 6h16M4 12h16M4 18h16"
                  : "M6 18L18 6M6 6l12 12"
              }
            />

          </svg>

        </button>

        {/* MENU */}
        <div
          className={`
            ${Toggle ? "hidden" : "flex"}

            flex-col lg:flex-row
            w-full

            lg:flex
            lg:items-center
            lg:justify-between

            mt-4 lg:mt-0
          `}
        >

          {/* MOBILE CARD */}
          <div
            className="
              lg:contents

              bg-white
              rounded-3xl
              shadow-xl
              border border-gray-100

              p-5
            "
          >

            {/* LEFT LINKS */}
            <ul
              className="
                flex flex-col lg:flex-row
                gap-2 lg:gap-6
                text-center lg:mt-1
              "
            >

              {/* MOBILE USER */}
              {status === "authenticated" && (

                <li
                  className="
                    lg:hidden
                    py-3
                    text-neutral-700!
                                        border-b border-gray-200
                    mb-2
                    text-sm
                    font-medium
                  "
                >

                  {Session?.user?.name && (
                    <>
                      Hi

                      <span
                        className="
                          ml-2
                          uppercase
                          text-green-600
                          font-normal
                        "
                      >
                        {Session?.user?.name}
                      </span>
                    </>
                  )}

                </li>
              )}

              {/* LINKS */}
              {links.map((ele) => (

                <li key={ele.content}>

                  <Link
                    href={ele.path}
                    className="
                      block
                      px-4 py-2
                      rounded-xl

                      text-sm
                      uppercase
                      tracking-wide

                      font-medium

                    text-neutral-700!

                      hover:text-green-700
                      hover:bg-green-100

                      transition-all duration-300
                    "
                  >
                    {ele.content}
                  </Link>

                </li>
              ))}

            </ul>

            {/* RIGHT SIDE */}
            <div className="lg:ml-auto">

              <ul
                className="
                  mt-6 lg:mt-0

                  flex flex-col lg:flex-row
                  items-center

                  gap-5
                "
              >

                {status === "authenticated" ? (

                  <>
                    {/* DESKTOP USER */}
                    <li
                      className="
                        hidden lg:flex
                        items-center

                    text-neutral-700!
                                            text-sm
                        font-medium
                      "
                    >

                      Hi

                      <span
                        className="
                          ml-2
                          uppercase
                          text-green-600
                          font-normal
                        "
                      >
                        {Session?.user?.name}
                      </span>

                    </li>

                    {/* CART */}
                    <li>

                      <Link
                        href="/cart"
                        className="
                          relative
                          flex items-center justify-center
                        "
                      >

                        <i
                          className="
                            fa-solid fa-shopping-cart

                            text-2xl

                            text-gray-500
                            hover:text-green-600

                            transition duration-300
                          "
                        ></i>

                        {/* BADGE */}
                        {totalItems > 0 && (

                          <span
                            className="
                              absolute
                              -top-2
                              -right-3

                              min-w-[20px]
                              h-5
                              px-1

                              rounded-full

                              bg-green-500
                              text-white

                              text-[10px]
                              font-bold

                              flex items-center justify-center

                              shadow-md
                            "
                          >
                            {totalItems}
                          </span>
                        )}

                      </Link>

                    </li>

                    {/* LOGOUT */}
                    <li
                      onClick={logout}
                      className="
                        cursor-pointer

                        px-4 py-2
                        rounded-xl

                        text-sm
                        uppercase
                        tracking-wide

                        font-medium

                    text-neutral-700!
                        hover:text-red-500!
                        hover:bg-red-100

                        transition-all duration-300
                      "
                    >
                      Logout
                    </li>
                  </>

                ) : (

                  <>
                    {auth.map((ele) => (

                      <li key={ele.content}>

                        <Link
                          href={ele.path}
                          className="
                            block
                            px-4 py-2
                            rounded-xl

                            text-sm
                            uppercase
                            tracking-wide

                            font-medium

                    text-neutral-700!
                            hover:text-green-700
                            hover:bg-green-100

                            transition-all duration-300
                          "
                        >
                          {ele.content}
                        </Link>

                      </li>
                    ))}
                  </>
                )}

              </ul>

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}