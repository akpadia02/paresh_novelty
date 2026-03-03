"use client";

import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { CircularProgress } from "@nextui-org/react";
import toast from "react-hot-toast";
import AuthContextProvider, { useAuth } from "@/context/AuthContext";
import { useProductReviews } from "@/lib/firestore/reviews/read";
import { createProductReview } from "@/lib/firestore/reviews/write";

function ReviewInner({ productId }) {
  const { user } = useAuth();
  const { data: reviews, error, isLoading } = useProductReviews({ productId });

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createProductReview({ productId, user, rating, comment });
      toast.success("Review added successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.message ?? "Failed to add review.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="mt-8 flex flex-col gap-5 font-playfair">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>

      {/* Add review form */}
      <div className="border border-[#FEC4C7] rounded-2xl p-4 bg-[#fff7f8]">
        <h3 className="text-sm md:text-base font-semibold mb-2">
          Write a review
        </h3>
        {!user && (
          <p className="text-xs text-gray-600 mb-2">
            Please{" "}
            <a
              href="/login"
              className="text-[#e3747d] underline underline-offset-2"
            >
              login
            </a>{" "}
            to share your experience.
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold">Your rating:</span>
            <Rating
              name="product-rating"
              value={rating}
              precision={0.5}
              onChange={(_, value) => setRating(value ?? 0)}
              size="small"
            />
          </div>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-[#FEC4C7] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FEC4C7]"
            placeholder="Share details about quality, fit, packaging or your overall experience."
          />
          <button
            type="submit"
            disabled={isSubmitting || !user}
            className="px-5 py-2 rounded-full bg-[#FEC4C7] text-xs md:text-sm font-semibold hover:bg-[#fbe1e3] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting && (
              <CircularProgress
                size="sm"
                aria-label="Saving"
              />
            )}
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {isLoading && (
          <div className="flex justify-center py-6">
            <CircularProgress />
          </div>
        )}
        {error && !isLoading && (
          <p className="text-xs text-red-500">{error}</p>
        )}
        {!isLoading && !error && (!reviews || reviews.length === 0) && (
          <p className="text-xs text-gray-500">
            No reviews yet. Be the first to review this product!
          </p>
        )}
        {!isLoading &&
          !error &&
          reviews?.map((review) => {
            const createdAt =
              review?.createdAt && review.createdAt.toDate
                ? review.createdAt.toDate().toLocaleDateString()
                : "";
            return (
              <div
                key={review?.id}
                className="border border-[#FEC4C7] rounded-2xl p-3 bg-white flex flex-col gap-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">
                      {review?.userName ?? "Customer"}
                    </p>
                    {createdAt && (
                      <p className="text-[10px] text-gray-500">{createdAt}</p>
                    )}
                  </div>
                  <Rating
                    name="read-only-rating"
                    value={review?.rating ?? 0}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {review?.comment}
                </p>
              </div>
            );
          })}
      </div>
    </section>
  );
}

function Review(props) {
  // Wrap with AuthContextProvider because (pages) layout does not include it
  return (
    <AuthContextProvider>
      <ReviewInner {...props} />
    </AuthContextProvider>
  );
}

export default Review;