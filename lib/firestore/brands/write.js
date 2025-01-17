import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";

export const createNewBrand = async ({ data, image }) => {
    if (!image) {
        throw new Error("Image is Required");
    }
    if (!data?.name) {
        throw new Error("Name is required");
    }

    // Upload image to Cloudinary via API route
    const response = await fetch("/api/upload", {
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

    const newId = doc(collection(db, `brands`)).id;

    await setDoc(doc(db, `brands/${newId}`), {
        ...data,
        id: newId,
        imageURL,
        timestampCreate: Timestamp.now(),
    });
};

export const deleteBrand = async ({ id }) => {
    if (!id) {
        throw new Error("ID is required");
    }
    await deleteDoc(doc(db, `brands/${id}`));
};


export const updateBrand = async ({ data, image }) => {
    if (!data?.name) {
      throw new Error("Name is required");
    }
    if (!data?.id) {
      throw new Error("ID is required");
    }
  
    let imageURL = data?.imageURL; // Use existing imageURL if no new image is provided
  
    if (image) {
      // Upload new image to Cloudinary via API route
      const response = await fetch("/api/upload", {
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
    const brandRef = doc(db, `brands/${data.id}`);
    await setDoc(
      brandRef,
      {
        ...data,
        imageURL,
        timestampUpdated: Timestamp.now(),
      },
      { merge: true } // Ensures fields are merged instead of overwriting
    );
  };