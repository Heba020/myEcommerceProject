"use client";

import { useEffect, useState } from "react";

import { addToWishlist } from "../apis/WishList/AddWishlist.api";
import { RemoveWishlist } from "../apis/WishList/RemoveWishList.api";
import toast from "react-hot-toast";

export default function WishList({
  id,
  initialLiked,
}: {
  id: string;
  initialLiked: boolean;
}) {

  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);


  async function handleWishlist() {

    try {

      setLoading(true);

      if (liked) {

        const result = await RemoveWishlist(id);

        if (result.status === "success") {
          setLiked(false);
            toast.success("Removed from wishlist");

        }

      } else {

        const result = await addToWishlist(id);

        if (result.status === "success") {
          setLiked(true);
            toast.success("Added to wishlist");

        }
      }

    } catch (error) {
        toast.error("Please Login First");

    } finally {

      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleWishlist}
      className=" absolute top-3 left-3 cursor-pointer z-30"
    >

      {loading ? (

        <i className="fas fa-spinner fa-spin text-green-500 text-2xl"></i>

      ) : (

        <i
          className={`fa-heart text-2xl transition-all duration-200 ${
            liked
              ? "fa-solid text-green-500"
              : "fa-regular text-gray-400"
          }`}
        ></i>

      )}

    </button>
  );
}