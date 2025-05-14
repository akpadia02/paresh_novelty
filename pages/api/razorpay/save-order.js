import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";

// Initialize Firebase Admin SDK (do this once)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!getFirestore.apps?.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }

  const { uid, address, productList, paymentDetails } = req.body;
  
  try {
    if (!uid || !address || !productList || !paymentDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Example of logging data for debugging
    console.log("Request body:", req.body);

    const orderData = {
      uid,
      address,
      productList,
      paymentDetails,
      paymentMode: "prepaid",
      status: "paid",
      createdAt: new Date().toISOString(),
    };

    // Check if orderData is properly formed
    console.log("Order Data to Save:", orderData);

    // Saving to Firestore
    const docRef = await db.collection("orders").add(orderData);
    res.status(200).json({ orderId: docRef.id });
  } catch (err) {
    console.error("Error saving order to Firestore:", err);
    res.status(500).json({ error: "Failed to save order", details: err.message });
  }
}
