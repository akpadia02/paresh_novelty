// "use client"
// import React from 'react'

// function page() {
//   return (
//     <main className='p-5'>
//         <h1>Account</h1>
//         <a href='/admin'>Admin</a>
//     </main>
//   )
// }

// export default page

"use client";

import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/lib/firestore/orders/read";
import { CircularProgress } from "@nextui-org/react";

export default function Page() {
  const { user } = useAuth();

  const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <main className="px-5 py-10 font-playfair">
        <h1 className="text-xl text-red-500">{error}</h1>
      </main>
    );
  }

  const hasOrders = orders && orders.length > 0;

  return (
    <main className="px-5 py-8 md:px-16 font-playfair">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">My Orders</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track your recent purchases and order status.
          </p>
        </div>
        <a
          href="/admin"
          className="hidden md:inline-flex text-xs bg-[#FEC4C7] px-4 py-2 rounded-full hover:bg-[#fbe1e3] transition-all"
        >
          Go to Admin Dashboard
        </a>
      </div>

      {!hasOrders && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 border border-dashed border-[#FEC4C7] rounded-2xl bg-[#fff7f8]">
          <img className="h-40 md:h-52" src="/assets/Empty-cuate.svg" alt="Empty orders" />
          <h2 className="text-lg font-semibold text-gray-700">
            You have no orders yet.
          </h2>
          <p className="text-xs md:text-sm text-gray-500 text-center max-w-md">
            Explore our latest collections and add your favourite items to the cart to place your first order.
          </p>
          <a
            href="/products"
            className="text-xs bg-[#FEC4C7] px-5 py-2 rounded-full hover:bg-[#fbe1e3] transition-all"
          >
            Start Shopping
          </a>
        </div>
      )}

      {hasOrders && (
        <section className="mt-4 space-y-4">
          {orders?.map((order) => {
            const orderDate = order?.createdAt ?? order?.timestampCreate;
            const createdAtText = orderDate?.toDate
              ? orderDate.toDate().toLocaleString()
              : "";

            const totalAmount =
              order?.totalAmount ??
              order?.items?.reduce(
                (prev, curr) => prev + (curr?.price ?? 0) * (curr?.quantity ?? 0),
                0
              );

            return (
              <div
                key={order?.id}
                className="border border-[#FEC4C7] rounded-2xl p-4 md:p-5 bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Order ID
                    </p>
                    <p className="font-mono text-sm md:text-base">
                      {order?.id}
                    </p>
                    {createdAtText && (
                      <p className="text-xs text-gray-500">{createdAtText}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-3 py-1 rounded-full text-[10px] md:text-xs bg-blue-100 text-blue-600 uppercase">
                      {order?.paymentMethod ?? order?.paymentMode}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] md:text-xs uppercase ${
                        order?.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order?.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order?.status ?? "Pending"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] md:text-xs bg-[#FEC4C7] text-black font-semibold">
                      Total: ₹ {totalAmount}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#fbe1e3] pt-3 mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {order?.items?.map((product) => (
                    <div
                      key={product?.productId}
                      className="flex gap-3 items-center"
                    >
                      <img
                        className="h-14 w-14 rounded-xl object-cover border border-[#FEC4C7]"
                        src={product?.image}
                        alt={product?.title ?? "Product Image"}
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">
                          {product?.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          ₹ {product?.price} × {product?.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}