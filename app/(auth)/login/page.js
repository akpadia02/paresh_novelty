"use client"

import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase'
import { Button } from '@nextui-org/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/account");
        }
    }, [user]);

    return (
        // w-full flex justify-center items-center bg-gray-300 p-24 min-h-screen //center a div
        <main className='w-full flex justify-center items-center bg-white md:p-24 p-10 min-h-screen font-playfair'>
            <section className='flex flex-col gap-3'>
                <div className='flex justify-center'>
                    <img src='/assets/logo.png' alt='logo' className='h-15'></img>
                </div>
                <div className='flex flex-col gap-3 bg-[#FEC4C7] md:p-10 p-5 rounded-xl md:min-w-[440px] w-full'>
                    <h1 className='font-bold text-xl'>Login with Email</h1>
                    <form className='flex flex-col gap-3'>
                        <input placeholder="Enter your Email" type="email" name='user-email' id='user-email' className='px-3 py-2 rounded-xl border focus:outline-none w-full' />{" "}
                        <input placeholder="Enter your Password" type="password" name='user-password' id='user-password' className='px-3 py-2 rounded-xl border focus:outline-none w-full' />
                        <Button className='bg-white'>Login</Button>
                    </form>
                    <div className='flex justify-between'>
                        <Link href={'/sign-up'}>
                            <button className='font-semibold md:text-sm text-xs'>Create Account</button>
                        </Link>
                        <Link href={'/forget-passward'}>
                            <button className='font-semibold md:text-sm text-xs'>Forget Password?</button>
                        </Link>
                    </div>
                    <hr />
                    <SignWithGoogleComponent />
                </div>
            </section>
        </main>
    )
}

function SignWithGoogleComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const user = await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);

    };
    return <>
        <Button isLoading={isLoading} isDisabled={isLoading} onPress={handleLogin} className="bg-white">
            <img src="assets/google.png" className="h-6" alt="Google Logo" />Sign in with Google
        </Button>

    </>
}

export default page