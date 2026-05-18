"use client";

import { useQuery }
from "@tanstack/react-query";

import Loading
from "./Loading";

export default function AllOrdersComponent() {

  // GET ORDERS
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({

    queryKey: ["orders"],

    queryFn: async () => {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/`
      );

      if (!res.ok) {

        throw new Error(
          "Failed to fetch orders"
        );
      }

      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {

    return (
      <h2
        className="
          text-center
          text-red-500
          mt-10
          text-xl
        "
      >
        {(error as Error).message}
      </h2>
    );
  }

  return (

    <div
      className="
        max-w-screen-2xl
        mx-auto
        px-4
        lg:px-8
        py-8
      "
    >

      {/* HEADER */}
      <div className="mb-8">

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-bold
            text-gray-900
          "
        >
          All Orders
        </h1>

        <p
          className="
            text-sm
            text-gray-500
            mt-2
          "
        >
          Total Orders: {data?.results}
        </p>

      </div>

      {/* ORDERS */}
      <div className="space-y-8">

        {data?.data?.map(
          (order: any) => (

          <div
            key={order._id}
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              shadow-sm
              overflow-hidden
            "
          >

            {/* ORDER TOP */}
            <div
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
                p-5
                border-b
                border-gray-200
                bg-gray-50
              "
            >

              {/* LEFT */}
              <div>

                <h2
                  className="
                    text-lg
                    font-bold
                    text-gray-900
                  "
                >
                  Order #{order.id}
                </h2>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    mt-2
                    text-sm
                    text-gray-500
                  "
                >

                  <span>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </span>

                  <span
                    className="
                      w-[1px]
                      h-4
                      bg-gray-300
                    "
                  ></span>

                  <span>
                    {order.paymentMethodType}
                  </span>

                </div>

              </div>

              {/* RIGHT */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  flex-wrap
                "
              >

                {/* PAID */}
                <span
                  className={`
                    px-4
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                    ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {order.isPaid
                    ? "Paid"
                    : "Unpaid"}
                </span>

                {/* DELIVERY */}
                <span
                  className={`
                    px-4
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                    ${
                      order.isDelivered
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {order.isDelivered
                    ? "Delivered"
                    : "Pending Delivery"}
                </span>

              </div>

            </div>

            {/* PRODUCTS */}
            <div className="p-5 space-y-5">

              {order.cartItems.map(
                (
                  item: any,
                  index: number
                ) => (

                <div
                  key={item._id}
                  className={`
                    flex
                    gap-4
                    ${
                      index !==
                      order.cartItems.length - 1
                        ? "border-b border-gray-100 pb-5"
                        : ""
                    }
                  `}
                >

                  {/* IMAGE */}
                  <div
                    className="
                      w-[90px]
                      h-[90px]

                      sm:w-[110px]
                      sm:h-[110px]

                      bg-gray-100
                      rounded-2xl
                      overflow-hidden
                      shrink-0
                    "
                  >

                    <img
                      src={
                        item.product.imageCover
                      }
                      alt={
                        item.product.title
                      }
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  </div>

                  {/* CONTENT */}
                  <div
                    className="
                      flex-1
                      min-w-0
                    "
                  >

                    <h3
                      className="
                        text-sm
                        sm:text-base
                        font-semibold
                        text-gray-900
                        truncate
                      "
                    >
                      {item.product.title}
                    </h3>

                    {/* CATEGORY */}
                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-gray-500
                      "
                    >
                      {
                        item.product.category.name
                      }
                    </p>

                    {/* BRAND */}
                    <p
                      className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-gray-500
                      "
                    >
                      Brand:
                      {" "}
                      {
                        item.product.brand.name
                      }
                    </p>

                    {/* PRICE */}
                    <div
                      className="
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        text-sm
                      "
                    >

                      <span
                        className="
                          font-semibold
                          text-gray-900
                        "
                      >
                        {item.price} EGP
                      </span>

                      <span
                        className="
                          w-[1px]
                          h-4
                          bg-gray-300
                        "
                      ></span>

                      <span
                        className="
                          text-gray-500
                        "
                      >
                        Qty:
                        {" "}
                        {item.count}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* FOOTER */}
            <div
              className="
                border-t
                border-gray-200
                bg-gray-50
                p-5
              "
            >

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                "
              >

                {/* SHIPPING */}
                <div
                  className="
                    space-y-1
                    text-sm
                    text-gray-500
                  "
                >

                  <p>
                    Shipping:
                    {" "}
                    {order.shippingPrice}
                    {" "}
                    EGP
                  </p>

                  <p>
                    Tax:
                    {" "}
                    {order.taxPrice}
                    {" "}
                    EGP
                  </p>

                </div>

                {/* TOTAL */}
                <div
                  className="
                    text-2xl
                    font-bold
                    text-green-600
                  "
                >

                  {order.totalOrderPrice}
                  {" "}
                  EGP

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}