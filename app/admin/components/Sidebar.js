// "use client"

// import { auth } from '@/lib/firebase'
// import { signOut } from 'firebase/auth'
// import { ChartColumnStacked, CircleUserRound, Gem, LayoutDashboard, LogOut, PackageOpen, ShieldCheck, ShoppingCart, SquareLibrary, Star } from 'lucide-react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'
// import toast from 'react-hot-toast'

// function Sidebar() {
//     const menuList = [
//         {
//             name: "Dashboard",
//             link: "/admin",
//             icon: <LayoutDashboard className='h-5 w-5' />
//         },
//         {
//             name: "Products",
//             link: "/admin/products",
//             icon: <PackageOpen className='h-5 w-5' />

//         },
//         {
//             name: "Categories",
//             link: "/admin/categories",
//             icon: <ChartColumnStacked className='h-5 w-5' />
//         },
//         {
//             name: "Brands",
//             link: "/admin/brands",
//             icon: <Gem className='h-5 w-5' />
//         },
//         {
//             name: "Orders",
//             link: "/admin/orders",
//             icon: <ShoppingCart className='h-5 w-5' />
//         },
//         {
//             name: "Customers",
//             link: "/admin/customers",
//             icon: <CircleUserRound className='h-5 w-5' />
//         },
//         {
//             name: "Reviews",
//             link: "/admin/reviews",
//             icon: <Star className='h-5 w-5' />
//         },
//         {
//             name: "Collections",
//             link: "/admin/collections",
//             icon: <SquareLibrary className='h-5 w-5' />
//         },
//         {
//             name: "Admins",
//             link: "/admin/admins",
//             icon: <ShieldCheck className='h-5 w-5' />
//         },
//     ]
//     return (
//         // md:w-[210px] w-[180px]
//         <section className='flex flex-col gap-8 bg-[#FEC4C7] border-r px-5 py-3 min-h-screen overflow-hidden w-[210px] z-[1000]'>
//             <div className='flex justify-center'>
//                 <img src='/assets/logo.png' alt='logo'></img>
//             </div>
//             <ul className='flex-1 flex flex-col gap-1 overflow-auto h-full'>
//                 {menuList?.map((item, key) => {
//                     return (
//                         <Tab item={item} key={key} />
//                     );
//                 })}
//             </ul>
//             <div className='flex justify-center'>
//                 <button
//                 onClick={async()=>{
//                     try{
//                         await toast.promise(signOut(auth),{
//                             error: (e)=> e?.message,
//                             loading: "Loading...",
//                             success: "Successfully Logged Out"
//                         })
//                     }catch(error){
//                         toast.error(error?.message);
//                     }
//                 }} 
//                 className='flex gap-2 items-start px-3 py-2 hover:bg-[#fbe1e3] rounded-xl w-full justify-center ease-soft-spring duration-300 transition-all'>
//                     <LogOut className='h-5 w-5' />Log out
//                 </button>
//             </div>
//         </section>
//     )
// }

// export default Sidebar

// function Tab({ item }) {
//     const pathname = usePathname();
//     const isSelected = pathname == item?.link;
//     return (
//         <Link href={item?.link} >
//             <li className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
//             ${isSelected ? "bg-[#fbe1e3]" : "bg-[#FEC4C7]"}`}>{item?.icon}{item?.name}</li>
//         </Link>
//     );
// }

"use client" 
import { auth } from '@/lib/firebase' 
import { signOut } from 'firebase/auth' 
import { ChartColumnStacked, CircleUserRound, Gem, LayoutDashboard, LogOut, PackageOpen, ShieldCheck, ShoppingCart, SquareLibrary, Star } from 'lucide-react' 
import Link from 'next/link' 
import { usePathname } from 'next/navigation' 
import React from 'react' 
import toast from 'react-hot-toast'

function Sidebar() { 
    const menuList = [ 
        { name: "Dashboard", link: "/admin", icon: <LayoutDashboard className='h-5 w-5' /> }, 
        { name: "Products", link: "/admin/products", icon: <PackageOpen className='h-5 w-5' /> }, 
        { name: "Categories", link: "/admin/categories", icon: <ChartColumnStacked className='h-5 w-5' /> }, 
        // { name: "Brands", link: "/admin/brands", icon: <Gem className='h-5 w-5' /> }, 
        { name: "Orders", link: "/admin/orders", icon: <ShoppingCart className='h-5 w-5' /> }, 
        { name: "Customers", link: "/admin/customers", icon: <CircleUserRound className='h-5 w-5' /> }, 
        { name: "Reviews", link: "/admin/reviews", icon: <Star className='h-5 w-5' /> }, 
        { name: "Collections", link: "/admin/collections", icon: <SquareLibrary className='h-5 w-5' /> }, 
        { name: "Admins", link: "/admin/admins", icon: <ShieldCheck className='h-5 w-5' /> }, 
    ]; 

    return ( 
        <section className='sticky top-0 flex flex-col gap-8 bg-[#FEC4C7] border-r px-5 py-3 min-h-screen h-screen overflow-hidden w-[210px] z-[1000]'> 
            <div className='flex justify-center'> 
                <img src='/assets/logo.png' alt='logo'></img> 
            </div> 
            <ul className='flex-1 flex flex-col gap-1 overflow-auto'> 
                {menuList?.map((item, key) => { 
                    return ( <Tab item={item} key={key} /> ); 
                })} 
            </ul> 
            <div className='flex justify-center'> 
                <button 
                    onClick={async () => { 
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
                    className='flex gap-2 items-center px-3 py-2 hover:bg-[#fbe1e3] rounded-xl w-full justify-center ease-soft-spring duration-300 transition-all'> 
                    <LogOut className='h-5 w-5' />Log out 
                </button> 
            </div> 
        </section> 
    ); 
} 

export default Sidebar 

function Tab({ item }) { 
    const pathname = usePathname(); 
    const isSelected = pathname == item?.link; 
    return ( 
        <Link href={item?.link} > 
            <li className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300 ${isSelected ? "bg-[#fbe1e3]" : "hover:bg-[#fbe1e3]"} `}>
                {item?.icon}{item?.name}
            </li> 
        </Link> 
    ); 
}
