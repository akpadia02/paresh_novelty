import { db } from "@/lib/firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import axios from "axios";


// Razorpay API call (use your backend for security if needed)
const createRazorpayOrder = async (amount, currency = "INR") => {
  const res = await axios.post("/api/razorpay/order", {
    amount,
    currency,
  });
  return res.data; // should return { id, amount, currency, ... }
};

export const createCheckoutAndGetRazorpayDetails = async ({ uid, products, address }) => {
  const checkoutId = doc(collection(db, "ids")).id;

  const ref = doc(db, `users/${uid}/checkout_sessions/${checkoutId}`);

  let line_items = [];
  let totalAmount = 0;

  products.forEach((item) => {
    const price = item?.product?.salePrice * 100;
    line_items.push({
      name: item?.product?.title ?? "",
      description: item?.product?.shortDescription ?? "",
      image: item?.product?.featureImageURL ?? `${process.env.NEXT_PUBLIC_DOMAIN}/logo.png`,
      amount: price,
      quantity: item?.quantity ?? 1,
      productId: item?.id,
    });
    totalAmount += price * (item?.quantity ?? 1);
  });

  // 1. Create Razorpay order (you can move this to a backend route for security)
  const razorpayOrder = await createRazorpayOrder(totalAmount);

  // 2. Save session details in Firestore
  await setDoc(ref, {
    id: checkoutId,
    razorpay_order_id: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    line_items,
    metadata: {
      uid,
      checkoutId,
      address: JSON.stringify(address),
    },
    status: "created",
    createdAt: Timestamp.now(),
  });

  return {
    orderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    checkoutId,
  };
};

export const createCheckoutCODAndGetId = async ({ uid, products, address }) => {
  const checkoutId = `cod_${doc(collection(db, `ids`)).id}`;

  const ref = doc(db, `users/${uid}/checkout_sessions_cod/${checkoutId}`);

  let line_items = [];

  products.forEach((item) => {
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.product?.title ?? "",
          description: item?.product?.shortDescription ?? "",
          images: [
            item?.product?.featureImageURL ??
              `${process.env.NEXT_PUBLIC_DOMAIN}/logo.png`,
          ],
          metadata: {
            productId: item?.id,
          },
        },
        unit_amount: item?.product?.salePrice * 100,
      },
      quantity: item?.quantity ?? 1,
    });
  });

  await setDoc(ref, {
    id: checkoutId,
    line_items: line_items,
    metadata: {
      checkoutId: checkoutId,
      uid: uid,
      address: JSON.stringify(address),
    },
    createdAt: Timestamp.now(),
  });

  return checkoutId;
};