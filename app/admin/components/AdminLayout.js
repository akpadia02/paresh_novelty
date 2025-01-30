"use client"

import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAdmin } from '@/lib/firestore/admins/read';
import { Button, CircularProgress } from '@nextui-org/react';
import { signOut } from 'firebase/auth';

function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef(null);
    const { user } = useAuth();
    const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

    const toogleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        toogleSidebar();
    }, [pathname]);

    //side par click krne par band
    useEffect(() => {
        function handleClickSideOutEvent(event) {
            if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickSideOutEvent);
        return () => {
            document.removeEventListener("mousedown", handleClickSideOutEvent);
        }
    }, []);
 
    if (isLoading) {
        return <div className='h-screen w-screen flex justify-center items-center'>
            <CircularProgress />
        </div>
    }

    if (!admin) {
        return <div className='h-screen w-screen flex justify-center items-center flex-col gap-2'>
            <h1 className='font-bold'>You are not Admin.</h1>
            <h1 className='text-gray-600'>{user?.email}</h1>
            <Button onPress={async()=>{
                await signOut(auth);
            }} className='bg-[#fbe1e3]'>LogOut</Button>
        </div>
    }

    if (error) {
        return <div className='h-screen w-screen flex justify-center items-center'>
            <h1 className='text-red-500'>{error}</h1>
        </div>
    }

    return (
        <main className='relative flex h-screen w-screen'>
            <div className='hidden md:block h-full'>
                <Sidebar />
            </div>
            <div ref={sidebarRef}
                className={`fixed md:hidden ease-in-out transition-all duration-400 z-50 h-screen
                ${isOpen ? "translate-x-0" : "-translate-x-[210px]"}
                `}>
                <Sidebar />
            </div>
            {/* sidebar here bec we need for all page */}
            <section className='flex-1 flex flex-col min-h-screen overflow-auto'>
                <Header toogleSidebar={toogleSidebar} />
                <section className='flex-1 bg-white pt-14'>{children}</section>

            </section>
        </main>
    )
}

export default AdminLayout