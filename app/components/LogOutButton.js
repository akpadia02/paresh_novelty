"use client";
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';

function LogOutButton() {
    const {user} = useAuth();
    if(!user){
        return <></>
    }
    return (
        <button
            onClick={async () => {
                if(!confirm("Are you sure?")) return;
                try {
                    await toast.promise(signOut(auth), {
                        error: (e) => e?.message,
                        loading: "Loading...",
                        success: "Successfully Logged Out"
                    })
                } catch (error) {
                    toast.error(error?.message);
                }
            }}
            className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#FEC4C7]'>
            <LogOut size={14} />
        </button>
    )
}

export default LogOutButton