import { db } from "@/lib/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

export const createProductReview = async ({
  productId,
  user,
  rating,
  comment,
}) => {
  if (!user?.uid) {
    throw new Error("You must be logged in to write a review.");
  }
  if (!productId) {
    throw new Error("Product not found.");
  }
  if (!rating || rating <= 0) {
    throw new Error("Please select a rating.");
  }
  if (!comment || comment.trim().length === 0) {
    throw new Error("Please write a short review.");
  }

  const reviewRef = doc(collection(db, "reviews"));

  const payload = {
    id: reviewRef.id,
    productId,
    userId: user.uid,
    userEmail: user.email ?? "",
    userName: user.displayName ?? "Customer",
    rating: Number(rating),
    comment: comment.trim(),
    createdAt: serverTimestamp(),
  };

  await setDoc(reviewRef, payload);

  return payload;
};

