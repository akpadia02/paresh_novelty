"use client"

import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase'
import { createUser } from '@/lib/firestore/users/write';
import { Button } from '@nextui-org/react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, updateProfile } from 'firebase/auth';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleSendEmail = async () => {
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth,data?.email);
            toast.success("Reset Link has been sent to yout Email");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    }


    return (
        // w-full flex justify-center items-center bg-gray-300 p-24 min-h-screen //center a div
        <main className='w-full flex justify-center items-center bg-white md:p-24 p-10 min-h-screen font-playfair'>
            <section className='flex flex-col gap-3'>
                <div className='flex justify-center'>
                    <img src='/assets/logo.png' alt='logo' className='h-15'></img>
                </div>
                <div className='flex flex-col gap-3 bg-[#FEC4C7] md:p-10 p-5 rounded-xl md:min-w-[440px] w-full'>
                    <h1 className='font-bold text-xl'>Forgot Password</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSendEmail();
                    }} className='flex flex-col gap-3'>
                        <input
                            placeholder="Enter your Email"
                            type="email"
                            name='user-email'
                            id='user-email'
                            value={data?.email}
                            onChange={(e) => {
                                handleData('email', e.target.value);
                            }}
                            className='px-3 py-2 rounded-xl border focus:outline-none w-full' />{" "}
                        <Button isLoading={isLoading} isDisabled={isLoading} type='submit' className='bg-white'>Send Reset Link</Button>
                    </form>
                    <div className='flex justify-between'>
                        <Link href={'/login'}>
                            <button className='font-semibold md:text-sm text-xs'>Sign In.</button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default page