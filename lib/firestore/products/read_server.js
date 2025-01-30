import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

export const getProduct = async({id}) =>{
    const data = await getDoc(doc(db,`products/${id}`));
    if(data.exists()){
        return data.data();
    }else{
        return null;
    }
}

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