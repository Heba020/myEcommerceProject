"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  cover: string;
  images: string[];
  title: string;
}

export default function ProductGallery({
  cover,
  images,
  title,
}: Props) {
  const [mainImage, setMainImage] = useState(cover);

  return (
    <div className="w-fit justify-self-center">
      {/* Top Image */}
      <Image
        alt={title}
        width={300}
        height={300}
        src={mainImage}
        className="mx-auto rounded-lg transition-all duration-300"
      />

      {/* Bottom Images */}
      <ul className="flex gap-4 w-fit mx-auto mt-3">
        {images.map((img) => (
          <li key={img}>
            <Image
              src={img}
              alt="pic"
              width={80}
              height={80}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer rounded-md border-2 transition-all duration-200 ${
                mainImage === img
                  ? "border-green-500 scale-105"
                  : "border-transparent"
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}