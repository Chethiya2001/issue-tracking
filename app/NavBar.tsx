import { link } from 'fs';
import Link from 'next/link'
import React from 'react'
import { FaBugSlash } from "react-icons/fa6";
const NavBar = () => {
    const links = [
        { lable: 'Dashboard', href: '/dashboard' },
        { lable: 'Issues', href: '/issues' },
    ]
    return (
        <nav className='flex space-x-6 border-b  mb-5 px-5 h-14 items-center'>
            <Link href='/'><FaBugSlash /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <Link key={link.href} href={link.href} className='text-zinc-500 hover:text-zinc-900 transition-colors' >{link.lable}
                    </Link>
                )}

            </ul>
        </nav>
    )
}

export default NavBar