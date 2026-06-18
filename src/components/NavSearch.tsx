"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarSearch() {
  const router = useRouter();

  const [search, setSearch] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(
        search
      )}`
    );
  };

  return (
    <div className="w-full">    <form
      onSubmit={handleSubmit}
      className="flex items-center"
    >
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className=" 
        my-1
            mx-2
          w-full
          border
          border-gray-300
          rounded-lg
        pl-2
          py-1
          focus:outline-none
          focus:border-green-500
        "
      />

      <button
        type="submit"
        className="
          bg-green-500
          text-white
          px-2
          py-1 
          mr-2
          rounded-lg
          cursor-pointer
          hover:bg-green-600
        "
      >
        <i className="fa-solid fa-search"></i>
      </button>
    </form>
    </div>

  );
}