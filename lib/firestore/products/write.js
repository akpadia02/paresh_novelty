import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";

// Cloudinary Upload Function
const uploadToCloudinary = async (image) => {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Cloudinary upload failed");
  }

  return result.url; // Return uploaded image URL
};

// Create New Product
export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!featureImage) {
    throw new Error("Feature Image is required");
  }

  // Upload feature image to Cloudinary
  const featureImageURL = await uploadToCloudinary(featureImage);

  // Upload additional images to Cloudinary
  let imageURLList = [];
  for (let i = 0; i < imageList?.length; i++) {
    const imageURL = await uploadToCloudinary(imageList[i]);
    imageURLList.push(imageURL);
  }

  // Generate a unique ID for the new product
  const newId = doc(collection(db, `products`)).id;

  // Save product details to Firestore
  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    featureImageURL,
    imageList: imageURLList,
    id: newId,
    timestampCreate: Timestamp.now(),
  });
};

// Update Existing Product
export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  let featureImageURL = data?.featureImageURL ?? "";

  // Upload new feature image to Cloudinary if provided
  if (featureImage) {
    featureImageURL = await uploadToCloudinary(featureImage);
  }

  // Update image list if new images are provided, otherwise keep existing
  let imageURLList = imageList?.length === 0 ? data?.imageList : [];
  for (let i = 0; i < imageList?.length; i++) {
    const imageURL = await uploadToCloudinary(imageList[i]);
    imageURLList.push(imageURL);
  }

  // Update product details in Firestore
  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageURL:featureImageURL,
    imageList: imageURLList,
    timestampUpdate: Timestamp.now(),
  });
};

// Delete Product
export const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }

  // Delete product document from Firestore
  await deleteDoc(doc(db, `products/${id}`));
};
