import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="grid gap-8 sm:grid-cols-4">

          {/* LOGO */}
          <div>
            <Image
              width={180}
              height={100}
              quality={75}
              src="/freshcart-white-logo.svg"
              alt="FreshCart Logo"
            />

            <p className="mt-3 text-white text-xs font-semibold leading-5">
              Simple shopping, secure checkout, and fast delivery.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h2
              className="
                mb-4
                text-sm
                font-semibold
                text-white
                uppercase
              "
            >
              Shop
            </h2>

            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <p className="text-white text-xs font-semibold cursor-pointer">
                    All Products
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/Categories">
                  <p className="text-white text-xs font-semibold cursor-pointer">
                    Categories
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/brands">
                  <p className="text-white text-xs font-semibold cursor-pointer">
                    Brands
                  </p>
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h2
              className="
                mb-4
                text-sm
                font-semibold
                text-white
                uppercase
              "
            >
              Customer Service
            </h2>

            <ul className="space-y-2">
              <li>
                <Link href="/allorders">
                  <p className="text-white text-xs font-semibold cursor-pointer">
                    Order Tracking
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/allorders">
                  <p className="text-white text-xs font-semibold cursor-pointer">
                    Shipping Information
                  </p>
                </Link>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h2
              className="
                mb-4
                text-sm
                font-semibold
                text-white
                uppercase
              "
            >
              Account
            </h2>

            <ul className="space-y-2">
              <li>
                <Link href="/WishList">
                  <p className="text-white text-xs font-semibold cursor-pointer">
                    Wishlist
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/allorders">
                  <p className="text-white text-xs font-semibold cursor-pointer">
                    Orders
                  </p>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-6 border-default sm:mx-auto lg:my-8" />

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            text-white
            text-sm
            font-semibold
          "
        >
          <span className="text-white text-sm font-semibold">
            © {new Date().getFullYear()} FreshCart. All Rights Reserved.
          </span>

          <div className="flex gap-4">
            <Link href="/privacy-policy">
              <p className="text-white text-xs font-semibold cursor-pointer">
                Privacy Policy
              </p>
            </Link>

            <Link href="/terms">
              <p className="text-white text-xs font-semibold cursor-pointer">
                Terms & Conditions
              </p>
            </Link>

            <Link href="/support">
              <p className="text-white text-xs font-semibold cursor-pointer">
                Support
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}