"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useProductReviews({ productId }) {
  const { data, error } = useSWRSubscription(
    ["reviews", productId],
    ([path, productId], { next }) => {
      if (!productId) {
        next(null, []);
        return () => {};
      }

      // To avoid requiring a composite index, we read all reviews
      // ordered by createdAt and filter by productId on the client.
      const ref = collection(db, "reviews");
      const q = query(ref, orderBy("createdAt", "desc"));

      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? []
              : snapshot.docs
                  .map((snap) => snap.data())
                  .filter((item) => item?.productId === productId)
          ),
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data,
    error: error?.message,
    isLoading: data === undefined,
  };
}

export function useAllReviews() {
  const { data, error } = useSWRSubscription(
    ["reviews-all"],
    ([path], { next }) => {
      const ref = collection(db, "reviews");
      const q = query(ref, orderBy("createdAt", "desc"));

      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? []
              : snapshot.docs.map((snap) => snap.data())
          ),
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data,
    error: error?.message,
    isLoading: data === undefined,
  };
}

