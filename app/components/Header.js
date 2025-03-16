import React from 'react';
import Link from 'next/link';
import { Heart, Search, ShoppingCart, UserCircle2 } from 'lucide-react';
import LogOutButton from './LogOutButton';
import AuthContextProvider from '@/context/AuthContext';
import HeaderClientButtons from './HeaderClientButtons';

function Header() {
    const menuList = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Contact",
            link: "/contact"
        },
        {
            name: "About",
            link: "/about"
        }
    ];
    return (
        <nav className='sticky top-0 z-50 py-1 px-4 md:py-3 md:px-16 border-b flex items-center justify-between bg-white'>
            <Link href='/'><img src='/assets/logo.png' className='h-10 md:h-12' alt='Logo' /></Link>
            <div className='hidden sm:flex gap-3 items-center font-playfair text-lg'>
                {menuList?.map((item, index) => (
                    <Link key={index} href={item?.link}>
                        <button className='text-lg px-2 py-2 rounded-lg hover:bg-[#FEC4C7]'>{item?.name}</button>
                    </Link>
                ))}
            </div>
            <div className='flex items-center gap-3'>
                <Link href={`/search`}>
                    <button title='Search Products' className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#FEC4C7]'>
                        <Search size={14} />
                    </button>
                </Link>
                <AuthContextProvider>
                    <HeaderClientButtons />
                </AuthContextProvider>
                <Link href={`/account`}>
                    <button title='My Account' className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-[#FEC4C7]'>
                        <UserCircle2 size={14} />
                    </button>
                </Link>
                <AuthContextProvider>
                    <LogOutButton />
                </AuthContextProvider>
            </div>
        </nav>
    );
}

export default Header;
