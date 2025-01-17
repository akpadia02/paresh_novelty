"use client"
import { Menu } from 'lucide-react'
import React from 'react'

function Header({toogleSidebar}) {
    return (
        <section className='sticky top-0 bg-[#fbe1e3] flex items-center border-b px-4 py-3'>
            <div className='flex justify-center items-center md:hidden'>
                <button onClick={toogleSidebar}><Menu /></button>
            </div>
            <h1 className='ml-2 text-xl font-semibold'>DashBoard</h1>
        </section>
    )
}

export default Header