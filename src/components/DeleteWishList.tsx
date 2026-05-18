"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { RemoveWishlist } from "../apis/WishList/RemoveWishList.api";

export default function DeleteWishlistButton({
  productId,
}: {
  productId: string;
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {

    try {

      setLoading(true);

      await RemoveWishlist(productId);

      router.refresh();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-3xl hover:scale-110 transition"
    >

      {loading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <i className="fa-regular fa-trash-can"></i>
      )}

    </button>
  );
}