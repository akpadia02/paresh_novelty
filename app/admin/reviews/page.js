"use client";

import React from "react";
import { useAllReviews } from "@/lib/firestore/reviews/read";
import { CircularProgress } from "@nextui-org/react";

export default function Page() {
  const { data: reviews, error, isLoading } = useAllReviews();

  return (
    <main className="p-5 flex flex-col gap-4 font-playfair">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Reviews</h1>
      </div>

      {isLoading && (
        <div className="h-[40vh] flex justify-center items-center">
          <CircularProgress />
        </div>
      )}

      {error && !isLoading && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="flex-1 md:pr-5 md:px-0 px-0 rounded-xl flex flex-col gap-3 w-full overflow-x-auto">
          <table className="border-separate border-spacing-y-3 min-w-full">
            <thead>
              <tr>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg text-left">
                  Sr. No.
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 text-left">
                  Product ID
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 text-left">
                  Customer
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 text-left">
                  Rating
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 text-left">
                  Review
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 border-r rounded-r-lg text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map((review, index) => {
                const createdAt =
                  review?.createdAt && review.createdAt.toDate
                    ? review.createdAt.toDate().toLocaleString()
                    : "";

                return (
                  <tr key={review?.id ?? index}>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg text-center">
                      {index + 1}
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2 text-xs font-mono">
                      {review?.productId}
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2">
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {review?.userName ?? "Customer"}
                        </span>
                        <span className="text-[10px] text-gray-600">
                          {review?.userEmail}
                        </span>
                      </div>
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2 text-sm">
                      ⭐ {review?.rating}
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2 text-xs max-w-xs">
                      {review?.comment}
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2 border-r rounded-r-lg text-[10px]">
                      {createdAt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

