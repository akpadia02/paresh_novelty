"use client"

import { createCheckoutCODAndGetId } from '@/lib/firestore/checkout/write';
import confetti from 'canvas-confetti';
import { CheckSquare2Icon, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

function Checkout({ productList }) {
    const [paymentMode, setPaymentMode] = useState("prepaid");
    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const handleAddress = (key, value) => {
        setAddress({ ...(address ?? {}), [key]: value });
    };
    const handlePlaceOrder = async () => {
        setIsLoading(true);
        try {
            if (totalPrice <= 0) {
                throw new Error("Price should be greater than 0");
            }
            if (!address?.fullName || !address?.mobile || !address?.addressLine1 || !address?.city || !address?.pincode || !address?.state || !address?.email) {
                throw new Error("Please fill all address details.");
            }

            if (paymentMode === 'prepaid') {
                // Call backend API to create order

            } else {
                // Call backend API for COD order placement

                const checkoutId = await createCheckoutCODAndGetId({
                    uid: user?.uid,
                    products: productList,
                    address: address,
                });
                router.push(`/checkout-cod?checkout_id=${checkoutId}`);
                // router.push('/account');
            }
            toast.success("Order placed successfully!");
            confetti();
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };


    const totalPrice = productList?.reduce((prev, curr) => {
        return prev + curr?.quantity * curr?.product?.salePrice;
    }, 0)

    return (
        <section className='flex gap-3 md:flex-row flex-col'>
            {/* details-shipping,billing */}
            <section className='flex-1 flex-col flex gap-4 border border-[#FEC4C7] rounded-xl p-4'>
                <h1 className='font-semibold text-xl'>Shipping Address</h1>
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        id='full-name'
                        name='full-name'
                        placeholder='Enter Full Name'
                        value={address?.fullName ?? ""}
                        onChange={(e) => { handleAddress("fullName", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />
                    <input
                        type='tel'
                        id='mobile'
                        name='mobile'
                        placeholder='Enter Mobile Number'
                        value={address?.mobile ?? ""}
                        onChange={(e) => { handleAddress("mobile", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter Email'
                        value={address?.email ?? ""}
                        onChange={(e) => { handleAddress("email", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />
                    <input
                        type='text'
                        id='address-line-1'
                        name='address-line-1'
                        placeholder='Enter Adress Line 1'
                        value={address?.addressLine1 ?? ""}
                        onChange={(e) => { handleAddress("addressLine1", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />
                    <input
                        type='text'
                        id='address-line-2'
                        name='address-line-2'
                        placeholder='Enter Adress Line 2'
                        value={address?.addressLine2 ?? ""}
                        onChange={(e) => { handleAddress("addressLine2", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />
                    <input
                        type='text'
                        id='state'
                        name='state'
                        placeholder='Enter State'
                        value={address?.state ?? ""}
                        onChange={(e) => { handleAddress("state", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />
                    <input
                        type='text'
                        id='city'
                        name='city'
                        placeholder='Enter City'
                        value={address?.city ?? ""}
                        onChange={(e) => { handleAddress("city", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />
                    <input
                        type='number'
                        id='pincode'
                        name='pincode'
                        placeholder='Enter PIN Code'
                        value={address?.pincode ?? ""}
                        onChange={(e) => { handleAddress("pincode", e.target.value); }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none' />

                </div>
            </section>
            {/* Products List, total, payment method, payment button */}
            <div className=' flex-1 flex flex-col gap-3'>
                <section className='flex flex-col gap-3 border border-[#FEC4C7] rounded-xl p-4'>
                    <h1 className='font-semibold text-xl'>Products</h1>
                    <div className='flex flex-col gap-2'>
                        {productList?.map((item, index) => {
                            return (
                                <div key={item.product?.id || index} className='flex gap-3 items-center'>
                                    <img className="w-14 h-14 object-cover rounded-xl mt-2" src={item?.product?.featureImageUrl} alt='' />
                                    <div className='flex-1 flex flex-col'>
                                        <h1>{item?.product?.title}</h1>
                                        {/* <div className="flex gap-2 items-center text-xs font-semibold">
                                        {item?.product?.salePrice < item?.product?.price && (
                                            <>
                                                ₹ {item?.product?.salePrice}{" "}
                                                <span className="line-through text-[10px] text-gray-600">₹ {item?.product?.price}</span>{" "}<span>X</span><span className='text-gray-600 text-sm'>{item?.quantity}</span>
                                            </>
                                        )}
                                        {item?.product?.salePrice === item?.product?.price && (
                                            <span>₹ {item?.product?.price}</span>
                                        )}
                                    </div> */}
                                        <h3 className=' text-sm'>
                                            ₹ {item?.product?.salePrice}{" "}
                                            <span>x</span>{" "}
                                            <span className='text-gray-600'>{item?.quantity}</span>
                                        </h3>
                                    </div>
                                    <div>
                                        <h3 className='text-lg'>
                                            ₹ {item?.product?.salePrice * item?.quantity}
                                        </h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex justify-between w-full p-2 items-center font-semibold'>
                        <h1>Total</h1>
                        <h1>₹  {totalPrice}</h1>
                    </div>
                </section>
                <section className='flex flex-col gap-3 border border-[#FEC4C7] rounded-xl p-4'>
                    <div className='flex flex-col md:flex-row items-center justify-between'>
                        <h2 className='font-semibold text-xl'>Payment Mode</h2>
                        <div className='flex items-center gap-3'>
                            <button onClick={() => {
                                setPaymentMode('prepaid');
                            }} className='flex items-center gap-1'>{paymentMode === 'prepaid' && <CheckSquare2Icon size={16} className='text-[#FEC4C7]' />} {paymentMode === 'cod' && <Square size={16} />}Prepaid</button>
                            <button onClick={() => {
                                setPaymentMode('cod');
                            }} className='flex items-center gap-1'>{paymentMode === 'prepaid' && <Square size={16} />} {paymentMode === 'cod' && <CheckSquare2Icon size={16} className='text-[#FEC4C7]' />}Cash On Delivery</button>
                        </div>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <CheckSquare2Icon size={16} className='text-[#FEC4C7]' />
                        <h4 className='text-xs test-gray-600'>I agree with the {" "} <span className='text-[#FEC4C7]'>Terms & Conditions</span></h4>
                    </div>
                    <button disabled={isLoading} onClick={handlePlaceOrder} className="bg-[#FEC4C7] flex-1 px-4 py-2 rounded-full hover:bg-[#fbe1e3] transition-all">
                        {isLoading ? "Placing Order..." : "Place Order"}
                    </button>
                </section>
            </div>
        </section>
    )
}

export default Checkout


// //npm install --save canvas-confetti
// //https://www.heroui.com/



////////////////////////////////////////////////////////////////////////////////////


// //razor pay
// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { Button } from "@nextui-org/react";
// import { CheckSquare2Icon, Square } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import confetti from "canvas-confetti";

// export default function Checkout({ productList }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentMode, setPaymentMode] = useState("prepaid");
//   const [address, setAddress] = useState(null);
//   const router = useRouter();
//   const { user } = useAuth();

//   const handleAddress = (key, value) => {
//     setAddress({ ...(address ?? {}), [key]: value });
//   };

//   const totalPrice = productList?.reduce((prev, curr) => {
//     return prev + curr?.quantity * curr?.product?.salePrice;
//   }, 0);

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePlaceOrder = async () => {
//     setIsLoading(true);
//     try {
//       if (totalPrice <= 0) throw new Error("Price should be greater than 0");
//       if (!address?.fullName || !address?.mobile || !address?.addressLine1) {
//         throw new Error("Please Fill All Address Details");
//       }
//       if (!productList || productList?.length === 0)
//         throw new Error("Product List Is Empty");

//       if (paymentMode === "prepaid") {
//         const res = await fetch("/api/razorpay/order", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: totalPrice,
//             uid: user?.uid,
//             address,
//             productList,
//           }),
//         });

//         const data = await res.json();
//         const rzpReady = await loadRazorpay();

//         if (!rzpReady) throw new Error("Razorpay SDK failed to load");

//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: data.amount,
//           currency: "INR",
//           name: "Your Store Name",
//           description: "Order Payment",
//           order_id: data.order_id,
//           handler: function (response) {
//             // Optionally validate payment here
//             toast.success("Payment Successful");
//             confetti();
//             router.push("/thank-you");
//           },
//           prefill: {
//             name: address.fullName,
//             email: address.email,
//             contact: address.mobile,
//           },
//           theme: {
//             color: "#000000",
//           },
//         };

//         const rzp = new Razorpay(options);
//         rzp.open();
//       } else {
//         // COD Flow
//         const res = await fetch("/api/create-cod-order", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             uid: user?.uid,
//             address,
//             productList,
//             paymentMode: "cod",
//           }),
//         });
//         const data = await res.json();
//         toast.success("Order placed successfully (COD)");
//         confetti();
//         router.push(`/checkout-cod?checkout_id=${data.checkoutId}`);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <section className="flex flex-col md:flex-row gap-3">
//       {/* Address Form */}
//       <section className="flex-1 flex flex-col gap-4 border rounded-xl p-4">
//         <h1 className="text-xl">Shipping Address</h1>
//         <div className="flex flex-col gap-2">
//           {[
//             { id: "fullName", placeholder: "Full Name" },
//             { id: "mobile", type: "tel", placeholder: "Mobile Number" },
//             { id: "email", type: "email", placeholder: "Email" },
//             { id: "addressLine1", placeholder: "Enter Address Line 1" },
//             { id: "addressLine2", placeholder: "Enter Address Line 2" },
//             { id: "pincode", type: "number", placeholder: "Enter Pincode" },
//             { id: "city", placeholder: "Enter City" },
//             { id: "state", placeholder: "Enter State" },
//           ].map(({ id, ...props }) => (
//             <input
//               key={id}
//               {...props}
//               id={id}
//               value={address?.[id] ?? ""}
//               onChange={(e) => handleAddress(id, e.target.value)}
//               className="border px-4 py-2 rounded-lg w-full focus:outline-none"
//             />
//           ))}
//           <textarea
//             id="orderNote"
//             placeholder="Notes about your order"
//             value={address?.orderNote ?? ""}
//             onChange={(e) => handleAddress("orderNote", e.target.value)}
//             className="border px-4 py-2 rounded-lg w-full focus:outline-none"
//           />
//         </div>
//       </section>

//       {/* Product + Payment */}
//       <div className="flex-1 flex flex-col gap-3">
//         {/* Product List */}
//         <section className="flex flex-col gap-3 border rounded-xl p-4">
//           <h1 className="text-xl">Products</h1>
//           {productList?.map((item, i) => (
//             <div key={i} className="flex gap-3 items-center">
//               <img className="w-14 h-14 object-cover rounded-xl mt-2" src={item?.product?.featureImageUrl} alt='' />
//               <div className="flex-1">
//                 <h1 className="text-sm">{item?.product?.title}</h1>
//                 <h3 className="text-green-600 font-semibold text-[10px]">
//                   ₹ {item?.product?.salePrice} x {item?.quantity}
//                 </h3>
//               </div>
//               <div className="text-sm font-medium">
//                 ₹ {item?.product?.salePrice * item?.quantity}
//               </div>
//             </div>
//           ))}
//           <div className="flex justify-between font-semibold">
//             <h1>Total</h1>
//             <h1>₹ {totalPrice}</h1>
//           </div>
//         </section>

//         {/* Payment Mode & Place Order */}
//         <section className="flex flex-col gap-3 border rounded-xl p-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl">Payment Mode</h2>
//             <div className="flex gap-3 text-xs">
//               <button
//                 onClick={() => setPaymentMode("prepaid")}
//                 className="flex items-center gap-1"
//               >
//                 {paymentMode === "prepaid" ? (
//                   <CheckSquare2Icon className="text-blue-500" size={13} />
//                 ) : (
//                   <Square size={13} />
//                 )}
//                 Prepaid
//               </button>
//               <button
//                 onClick={() => setPaymentMode("cod")}
//                 className="flex items-center gap-1"
//               >
//                 {paymentMode === "cod" ? (
//                   <CheckSquare2Icon className="text-blue-500" size={13} />
//                 ) : (
//                   <Square size={13} />
//                 )}
//                 Cash On Delivery
//               </button>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckSquare2Icon className="text-blue-500" size={13} />
//             <h4 className="text-xs text-gray-600">
//               I agree with the <span className="text-blue-700">terms & conditions</span>
//             </h4>
//           </div>
//           <Button
//             isLoading={isLoading}
//             isDisabled={isLoading}
//             onClick={handlePlaceOrder}
//             className="bg-black text-white"
//           >
//             Place Order
//           </Button>
//         </section>
//       </div>
//     </section>
//   );
// }













