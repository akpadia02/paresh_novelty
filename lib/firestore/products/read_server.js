import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"

// export const getProduct = async ({ id }) => {
//   const data = await getDoc(doc(db, `products/${id}`));
//   if (data.exists()) {
//     return data.data();
//   } else {
//     return null;
//   }
// }

export const getProduct = async ({ id }) => {
  const docSnap = await getDoc(doc(db, `products/${id}`));
  if (!docSnap.exists()) return null;

  return serializeFirestoreData(docSnap.data()); // ✅ Ensure timestamps are serialized
};

//fetch particular



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

export const getFeaturedProducts = async () => {
  try {
    const list = await getDocs(
      query(collection(db, "products"), where("isFeatured", "==", true))
    );
    return list.docs.map((snap) => ({
      id: snap.id,
      ...serializeFirestoreData(snap.data()), // Ensure fields are serializable
    }));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

export const getAllProducts = async () => {
  try {
    const list = await getDocs(collection(db, "products")); // No filtering
    return list.docs.map((snap) => ({
      id: snap.id,
      ...serializeFirestoreData(snap.data()), // Ensure fields are serializable
    }));
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};


export const getProductsByCategory = async ({ categoryId }) => {
  try {
    const productsQuery = query(
      collection(db, "products"),  // Reference collection
      where("categoryId", "==", categoryId),  // Filter by categoryId
      orderBy("timestampCreate", "desc")  // Sort by timestamp (requires index)
    );

    const list = await getDocs(productsQuery);

    return list.docs.map((snap) => ({
      id: snap.id,
      ...serializeFirestoreData(snap.data()),
    }));
  } catch (error) {
    console.error("Error fetching category-specific products:", error);
    return [];
  }
};

