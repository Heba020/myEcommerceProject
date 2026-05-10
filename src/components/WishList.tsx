'use client'
import { useState } from 'react'

export default function WishList() {
  const [wish, setWish] = useState(false);

  function toggleWish() {
    setWish(!wish);
  }

  return (
    <button
      onClick={toggleWish}
      className="absolute right-2 top-2 z-20 text-xl text-green-600"
    >
      <i
        className={`fa-heart ${
          wish ? 'fa-solid' : 'fa-regular'
        }`}
      ></i>
    </button>
  );
}