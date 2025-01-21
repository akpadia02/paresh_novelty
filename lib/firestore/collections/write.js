import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";

export const createNewCollection = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.products || data?.products?.length === 0) {
    throw new Error("Products are required");
  }

  // Upload image to Cloudinary via API route
  const response = await fetch("/api/upload_collection", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image }),
  });
  const result = await response.json();
  console.log(result);

  if (!response.ok) {
    throw new Error(result.message || "Cloudinary upload failed");
  }

  const imageURL = result.url;

  const newId = doc(collection(db, `collections`)).id;

  await setDoc(doc(db, `collections/${newId}`), {
    ...data,
    id: newId,
    imageURL,
    timestampCreate: Timestamp.now(),
  });
};

export const deleteCollection = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `collections/${id}`));
};


export const updateCollection = async ({ data, image }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.products || data?.products?.length === 0) {
    throw new Error("Products are required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  let imageURL = data?.imageURL; // Use existing imageURL if no new image is provided

  if (image) {
    // Upload new image to Cloudinary via API route
    const response = await fetch("/api/upload_collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Cloudinary upload failed");
    }

    imageURL = result.url; // Update imageURL with the new one
  }

  // Update the existing document with `merge: true` to avoid overwriting
  const categoryRef = doc(db, `collections/${data.id}`);
  await setDoc(
    categoryRef,
    {
      ...data,
      imageURL,
      timestampUpdated: Timestamp.now(),
    },
    { merge: true } // Ensures fields are merged instead of overwriting
  );
};