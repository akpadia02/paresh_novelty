"use client"

import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase'
import { createUser } from '@/lib/firestore/users/write';
import { Button } from '@nextui-org/react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { displayName } from 'react-quill';

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

    const handleSignUp = async () => {
        setIsLoading(true);
        try {
            //signUp
            const credential = await createUserWithEmailAndPassword(
                auth,
                data?.email,
                data?.password
            );
            await updateProfile(credential.user,{
                displayName:data?.name,
            });
            const user=credential?.user;
            await createUser({
                uid:user?.uid,
                displayName:data?.name,
                photoURL:user?.photoURL,
            });
            toast.success("SuccessFully Signed Up.")
            router.push('/account');
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
                    <h1 className='font-bold text-xl'>Sign Up with Email</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSignUp();
                    }} className='flex flex-col gap-3'>
                        <input
                            placeholder="Enter your Name"
                            type="text"
                            name='user-name'
                            id='user-name'
                            value={data?.name}
                            onChange={(e) => {
                                handleData('name', e.target.value);
                            }}
                            className='px-3 py-2 rounded-xl border focus:outline-none w-full' />
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
                        <input
                            placeholder="Enter your Password"
                            type="password"
                            name='user-password'
                            id='user-password'
                            value={data?.password}
                            onChange={(e) => {
                                handleData('password', e.target.value);
                            }}
                            className='px-3 py-2 rounded-xl border focus:outline-none w-full' />
                        <Button isLoading={isLoading} isDisabled={isLoading} type='submit' className='bg-white'>Sign Up</Button>
                    </form>
                    <div className='flex justify-between'>
                        <Link href={'/login'}>
                            <button className='font-semibold md:text-sm text-xs'>Already User? Sign In.</button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default page