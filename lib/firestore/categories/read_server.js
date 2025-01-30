import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

export const getCategory = async ({ id }) => {
    const data = await getDoc(doc(db, `categories/${id}`));
    if (data.exists()) {
        return data.data();
    } else {
        return null;
    }
}


// export const getFeaturedCategories = async () => {
//     const list = await getDocs(
//         query(collection(db,"categories"), where("isFeatured", "==", true))
//     );
//     return list.docs.map((snap)=>snap.data());

// }

import { Timestamp } from "firebase/firestore";

const serializeFirestoreData = (data) => {
  const serializedData = { ...data };

  Object.keys(serializedData).forEach((key) => {
    if (serializedData[key] instanceof Timestamp) {
      // Convert Firestore Timestamp to ISO string
      serializedData[key] = serializedData[key].toDate().toISOString();
    }
  });

  return serializedData;
};


export const getFeaturedCategories = async () => {
    try {
      const list = await getDocs(
        query(collection(db, "categories"), where("isFeatured", "==", true))
      );
      return list.docs.map((snap) => ({
        id: snap.id,
        ...serializeFirestoreData(snap.data()), // Ensure fields are serializable
      }));
    } catch (error) {
      console.error("Error fetching featured categories:", error);
      return [];
    }
  };


  export const getAllCategories = async () => {
    try {
      const list = await getDocs(collection(db, "categories")); // No filtering
      return list.docs.map((snap) => ({
        id: snap.id,
        ...serializeFirestoreData(snap.data()), // Ensure fields are serializable
      }));
    } catch (error) {
      console.error("Error fetching all categories:", error);
      return [];
    }
  };
  