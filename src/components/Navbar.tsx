"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartResponse } from "../interfaces/cart.interface";
import { useQuery } from "@tanstack/react-query";
import NavSearch from "./NavSearch";

export default function Navbar() {
  // CART
  const { data } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      return res.json();
    },
  });

  const products = data?.data?.products ?? [];

  const totalItems = products.reduce(
    (total, product) => total + product.count,
    0
  );

  // SESSION
  const { data: Session, status } = useSession();

  // MOBILE MENU
  const [Toggle, setToggle] = useState(true);

  function toggleMenu() {
    setToggle(!Toggle);
  }

  // LOGOUT
  function logout() {
    signOut({ callbackUrl: "/" });
  }

  // NAVIGATION LINKS
  const links = [
    ...(status === "authenticated"
      ? [
          {
            path: "/allorders",
            content: "Orders",
            icon: <i className="fa-solid fa-box"></i>,
          },
          {
            path: "/WishList",
            content: "Wishlist",
            icon: <i className="fa-solid fa-heart"></i>,
          },
        ]
      : []),
  ];

  // AUTH LINKS
  const auth = [
    {
      path: "/login",
      content: "Login",
    },
    {
      path: "/register",
      content: "Register",
    },
  ];

  return (
    <nav className="sticky top-0 z-[100]">
      <div
        className="
          w-full
          border-b border-gray-200
          bg-white/90
          backdrop-blur-lg
          shadow-sm
        "
      >
        <div
          className="
            w-full
            mx-auto

            px-3
            lg:px-6

            py-2

            flex
            flex-wrap
            items-center
            justify-between
          "
        >
          {/* LOGO + TOGGLE */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/" className="flex items-center">
              <Image
                src="/freshcart-logo.svg"
                alt="freshcart logo"
                width={180}
                height={100}
                quality={75}
                className="
                  w-[140px]
                  md:w-[160px]
                  lg:w-[180px]
                  h-auto

                  transition-transform
                  duration-300

                  hover:scale-105
                "
              />
            </Link>

            <button
              onClick={toggleMenu}
              type="button"
              className="
                lg:hidden

                flex items-center justify-center

                w-10 h-10

                rounded-xl
                border border-gray-300
                bg-neutral-50
                text-green-600

                hover:bg-green-100

                transition-all
                duration-300
                cursor-pointer
              "
            >
              <i
                className={`fa-solid 
 ${
                  Toggle ? "fa-bars" : "fa-xmark"
                } text-xl`}
              ></i>
            </button>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden lg:block flex-1 px-2">
            <NavSearch />
          </div>

          {/* MENU */}
          <div
            className={`
              ${Toggle ? "hidden" : "flex"}

              absolute lg:static

              top-full
              left-0
              z-50
              w-full
              lg:w-auto

              flex-col
              lg:flex-row

              mt-2
              lg:mt-0

              lg:flex
              lg:items-center
              lg:justify-between
            `}
          >
            <div
              className="
                lg:contents

                bg-white
                rounded-2xl

                border border-gray-200

                shadow-lg

                p-5
              "
            >
              {/* MOBILE SEARCH */}
              <div className="lg:hidden mb-4">
                <NavSearch />
              </div>
              
              {/* LEFT LINKS */}
              <ul
                className="
                  flex
                  flex-col
                  lg:flex-row
                  mx-1
                  text-center
                  lg:mt-2
                "
              >
                {/* MOBILE USER */}
                {status === "authenticated" && (
                  <li
                    className="
                      lg:hidden
mb-5
lg:mb-0
                      border-b
                      border-gray-300

                      text-sm
                      font-medium
                    "
                  >
                    {Session?.user?.name && (
                      <div
                        className="
                          bg-green-100
                          rounded-t-2xl
                          py-4
                        "
                      >
                        Hi
                        <span
                          className="
                            ml-2
                            uppercase

                            text-green-600
                            font-normal

                            pointer-events-none
                          "
                        >
                          {Session.user.name}
                        </span>
                      </div>
                    )}
                  </li>
                )}

                {/* NAV LINKS */}
                {links.map((ele) => (
                  <li key={ele.content}>
                    <Link
                      href={ele.path}
                      className="
                        block
                        px-3
                        py-3
                        lg:mb-1.5
                        mb-0.5
                        rounded-xl

                        text-sm
                        uppercase
                        tracking-wide
                        font-medium

                        text-neutral-700!

                        hover:bg-green-50
                        hover:text-green-600

                        transition-all
                        duration-300
                      "
                    >
                      <span className="me-2">
                        {ele.icon}
                      </span>

                      {ele.content}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* RIGHT SIDE */}
              <div className="lg:ml-auto">
                <ul
                  className="
                    mt-2.5
                    lg:mt-0

                    flex
                    flex-col
                    lg:flex-row

                    items-center

                    gap-2
                  "
                >
                  {status === "authenticated" ? (
                    <>
                      {/* DESKTOP USER */}
                      <li
                        className="
                          hidden
                          lg:flex

                          items-center

                          px-4
                          py-2

                          rounded-2xl

                          bg-green-100

                          text-sm
                          font-medium

                          pointer-events-none
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
                      <li className="w-full lg:w-auto">
                        <Link
                          href="/cart"
                          className="
                            relative

                            flex
                            items-center
                            justify-center
                            gap-2

                            w-full
                            lg:w-auto

                            px-4
                            py-2

                            rounded-xl

                            text-neutral-700!

                            hover:bg-green-50
                            hover:text-green-600

                            transition-all
                            duration-300
                          "
                        >
                          <div className="relative">
                            <i
                              className="
                                fa-solid
                                fa-shopping-cart
                                text-lg
                              "
                            ></i>

                            {totalItems > 0 && (
                              <span
                                className="
                                  absolute

                                  -top-2.5

                                  right-3.5
                                  lg:left-4

                                  min-w-[20px]
                                  h-5

                                  px-1

                                  rounded-full

                                  bg-green-500
                                  text-white

                                  text-[10px]
                                  font-bold

                                  flex
                                  items-center
                                  justify-center

                                  shadow-md
                                "
                              >
                                {totalItems}
                              </span>
                            )}
                          </div>

                          <span
                            className="
                              lg:hidden

                              text-sm
                              uppercase
                              tracking-wide
                              font-medium
                            "
                          >
                            Cart
                          </span>
                        </Link>
                      </li>

                      {/* LOGOUT */}
                      <li
                        onClick={logout}
                        className="
                          cursor-pointer

                          w-full
                          lg:w-auto

                          px-4
                          py-2

                          rounded-xl

                          text-center

                          text-sm
                          uppercase
                          tracking-wide
                          font-medium

                          text-neutral-700!

                          hover:bg-red-100
                          hover:text-red-600

                          transition-all
                          duration-300
                        "
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>

                        Logout
                      </li>
                    </>
                                      ) : (
                    <>
                      {auth.map((ele) => (
                        <li
                          key={ele.content}
                          className="w-full lg:w-auto"
                        >
                          <Link
                            href={ele.path}
                            className={`
                              block

                              w-full
                              lg:w-auto

                              px-4
                              py-3
                              lg:py-2

                              rounded-xl

                              text-center

                              text-sm
                              uppercase
                              tracking-wide
                              font-medium

                              transition-all
                              duration-300

                              ${
                                ele.content === "Register"
                                  ? `
                                    text-neutral-700!

                                    hover:bg-green-100

                                    lg:px-5
                                  `
                                  : `
                                    text-neutral-700!

                                    hover:bg-green-100
                                  `
                              }
                            `}
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
      </div>
    </nav>
  );
}