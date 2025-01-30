"use client"
import { useAuth } from '@/context/AuthContext'
import { useAdmin } from '@/lib/firestore/admins/read';
import { Avatar } from '@nextui-org/react';
import { Menu } from 'lucide-react'
import React from 'react'

function Header({ toogleSidebar }) {
    const { user } = useAuth();
    const { data: admin } = useAdmin({ email: user?.email });
    return (
        <section className='fixed w-full top-0 bg-[#fbe1e3] flex items-center border-b px-4 py-3'>
            <div className='flex justify-center items-center md:hidden'>
                <button onClick={toogleSidebar}><Menu /></button>
            </div>
            <div className='w-full flex justify-between items-center pr-0 md:pr-[210px]'>
                <h1 className='ml-2 text-xl font-semibold'>DashBoard</h1>
                <div className='flex gap-2 items-center'>
                    <div className='md:flex flex-col items-end hidden'>
                        <h1 className='text-sm font-semibold'>{admin?.name}</h1>
                        <h1 className='text-xs text-gray-600'>{admin?.email}</h1>
                    </div>
                    <Avatar size='sm' src={admin?.imageURL} />
                </div>
            </div>
        </section>
    )
}

export default Header