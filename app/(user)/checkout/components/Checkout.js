"use client"

import confetti from 'canvas-confetti';
import { CheckSquare2Icon, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Checkout({ productList }) {
    const [paymentMode, setPaymentMode] = useState("prepaid");
    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAddress = (key, value) => {
        setAddress({ ...(address ?? {}), [key]: value });
    };

    const handlePlaceOrder = async () => {
        setIsLoading(true);
        try {
            if (totalPrice <= 0) {
                throw new Error("Price should be greater than 0");
            }
            if (!address?.fullName || !address?.mobile || !address?.addressLine1 || !address?.addressLine2 || !address?.city || !address?.pincode || !address?.state || !address?.email) {
                throw new Error("Please Fill All Address Deatils");
            }
            await new Promise((res) => setTimeout(res, 3000)); //delay
            //Create API to place Order
            if(paymentMode === 'prepaid'){
                //razor pay gateway 
            }else{
                //call API to create order with cod
            }
            toast.success("SuccessFully Placed!");
            confetti(); //yolo
            router.push('/account');

        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    }

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


//npm install --save canvas-confetti
//https://www.heroui.com/