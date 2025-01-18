"use client"

import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { usePathname } from 'next/navigation';

function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname=usePathname();
    const sidebarRef=useRef(null);

    const toogleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(()=>{
        toogleSidebar();
    },[pathname]);

    //side par click krne par band
    useEffect(()=>{
        function handleClickSideOutEvent(event){
            if(sidebarRef.current && !sidebarRef?.current?.contains(event.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickSideOutEvent);
        return()=>{
            document.removeEventListener("mousedown",handleClickSideOutEvent);
        }
    },[]);

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