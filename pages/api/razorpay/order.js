// pages/api/razorpay/order.js
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, currency = "INR" } = req.body;

  try {
    // ✅ Convert rupees to paise
    const amountInPaise = Math.round(amount * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      payment_capture: 1,
    });

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
}
// import Razorpay from "razorpay";
// import { adminDB } from "@/lib/firebase_admin";

// export default async function handler(req, res) {
//     if (req.method !== "POST") return res.status(405).end();

//     try {
//         // Log the entire request body to see what's coming in
//         console.log("Request body:", JSON.stringify(req.body));
        
//         // Check if req.body exists and is not empty
//         if (!req.body || Object.keys(req.body).length === 0) {
//             console.error("Request body is empty or undefined");
//             return res.status(400).json({ error: "Request body is empty" });
//         }

//         const { amount, uid, address, productList } = req.body;
        
//         // Validate required fields
//         if (!amount) {
//             console.error("Amount is missing from request");
//             return res.status(400).json({ error: "Amount is required" });
//         }

//         // ✅ Convert rupees to paise
//         const amountInPaise = Math.round(amount * 100);
        
//         console.log("Creating Razorpay order with amount:", amountInPaise);

//         // Initialize Razorpay with your credentials
//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_SECRET,
//         });

//         // Create the order object explicitly
//         const orderOptions = {
//             amount: amountInPaise,
//             currency: "INR",
//             receipt: `receipt_${Date.now()}`,
//             payment_capture: 1,
//         };
        
//         console.log("Order options:", orderOptions);

//         // Create a Razorpay order
//         const order = await razorpay.orders.create(orderOptions);
        
//         console.log("Razorpay order created:", order);

//         // Prepare the session data to save in Firestore
//         const checkoutData = {
//             id: order.id,
//             amount: amountInPaise,
//             currency: "INR",
//             status: "pending",
//             uid,
//             address,
//             productList,
//             retry_url: `https://checkout.razorpay.com/v1/checkout/embedded/${order.id}`,
//             createdAt: new Date().toISOString(),
//         };

//         // Save order details to Firestore
//         await adminDB
//             .collection("razorpay_checkout_sessions")
//             .doc(order.id)
//             .set(checkoutData);

//         // Respond with the order details
//         res.status(200).json({
//             order_id: order.id,
//             amount: amountInPaise,
//             retryUrl: checkoutData.retry_url,
//         });
//     } catch (err) {
//         console.error("Error creating Razorpay order:", err);
//         // Log the full error stack
//         console.error(err.stack);
//         res.status(500).json({ error: err?.message || "Failed to create Razorpay order" });
//     }
// }