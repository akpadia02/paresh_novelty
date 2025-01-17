import React from 'react';
import Link from 'next/link';

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
        <nav className='py-3 px-12 border-b flex items-center justify-between'>
            <img src='/assets/logo.png' className='h-12' alt='Logo' />
            <div className='flex gap-4 items-center font-playfair text-lg'>
                {menuList?.map((item, index) => (
                    <Link key={index} href={item?.link}>
                        <button>{item?.name}</button>
                    </Link>
                ))}
            </div>
            <Link href={"/login"}>
                <button className='bg-[#FEC4C7] px-4 py-1 rounded-full font-playfair text-lg'>
                    Login
                </button>
            </Link>
        </nav>
    );
}

export default Header;
