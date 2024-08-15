'use client'
import { link } from 'fs';
import Link from 'next/link'
import React from 'react'
import { FaBugSlash } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
const NavBar = () => {
    const currentpath = usePathname();

    const links = [
        { lable: 'Dashboard', href: '/' },
        { lable: 'Issues', href: '/issues' },
    ]
    return (
        <nav className='flex space-x-6 border-b  mb-5 px-5 h-14 items-center'>
            <Link href='/'><FaBugSlash /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <Link
                        key={link.href}
                        href={link.href}
                        className={classNames({
                            'text-zinc-500': currentpath !== link.href,
                            'text-zinc-900': currentpath === link.href,
                            'hover:text-neutral-800 transition-colors': true
                        })} >{link.lable}
                    </Link>
                )}

            </ul>
        </nav>
    )
}

export default NavBar