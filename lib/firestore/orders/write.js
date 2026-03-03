import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Places a COD order and updates product stock atomically.
 *
 * @param {Object} params
 * @param {Object} params.user - The authenticated Firebase user object
 * @param {Array} params.productList - List of cart items with product details
 * @param {Object} params.address - Shipping address object from checkout form
 * @param {("cart"|"buynow")} params.sourceType - Source of the checkout
 */
export const placeCodOrderWithStockTransaction = async ({
  user,
  productList,
  address,
  sourceType,
}) => {
  if (!user?.uid) {
    throw new Error("You must be logged in to place an order.");
  }

  if (!productList || productList.length === 0) {
    throw new Error("Your cart is empty.");
  }

  // Build a simple items payload for the order document
  const itemsPayload = productList.map((item) => ({
    productId: item?.product?.id ?? item?.id,
    title: item?.product?.title ?? "",
    image: item?.product?.featureImageUrl ?? "",
    price: Number(item?.product?.salePrice ?? 0),
    quantity: Number(item?.quantity ?? 1),
  }));

  const totalAmount = itemsPayload.reduce(
    (sum, curr) => sum + curr.price * curr.quantity,
    0
  );

  if (totalAmount <= 0) {
    throw new Error("Total amount should be greater than 0.");
  }

  const orderRef = doc(collection(db, "orders"));
  const userRef = doc(db, `users/${user.uid}`);

  await runTransaction(db, async (transaction) => {
    // Validate and update each product's stock / orders
    for (const item of itemsPayload) {
      if (!item.productId) {
        throw new Error("Invalid product in cart.");
      }

      const productRef = doc(db, `products/${item.productId}`);
      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) {
        throw new Error("One of the products no longer exists.");
      }

      const productData = productSnap.data();
      const stock = Number(productData?.stock ?? 0);
      const existingOrders = Number(productData?.orders ?? 0);
      const available = stock - existingOrders;

      if (available < item.quantity) {
        throw new Error(
          `Only ${available} unit(s) of "${productData?.title ?? "product"}" are available.`
        );
      }

      const updatedOrders = existingOrders + item.quantity;

      transaction.update(productRef, {
        orders: updatedOrders,
        status: updatedOrders >= stock ? "Out of Stock" : "Available",
      });
    }

    // Prepare order document payload
    const orderDoc = {
      id: orderRef.id,
      userId: user.uid,
      uid: user.uid, // keep backward compatibility with existing hooks
      userEmail: user.email ?? "",
      items: itemsPayload,
      shippingAddress: {
        fullName: address?.fullName ?? "",
        mobile: address?.mobile ?? "",
        email: address?.email ?? "",
        addressLine1: address?.addressLine1 ?? "",
        addressLine2: address?.addressLine2 ?? "",
        state: address?.state ?? "",
        city: address?.city ?? "",
        pinCode: address?.pincode ?? address?.pinCode ?? "",
      },
      paymentMethod: "COD",
      paymentMode: "COD", // for compatibility with existing UI
      totalAmount,
      status: "Pending",
      createdAt: serverTimestamp(),
      timestampCreate: serverTimestamp(),
      sourceType: sourceType ?? "cart",
    };

    transaction.set(orderRef, orderDoc);

    // Clear cart only when checkout is from cart
    if (sourceType === "cart") {
      transaction.update(userRef, {
        carts: [],
      });
    }
  });

  return {
    orderId: orderRef.id,
    totalAmount,
  };
};

