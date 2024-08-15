
"use client"

import React from 'react'
import { Upload, File, Shield } from 'lucide-react'
import { useState } from 'react';
import Link from 'next/link';

const SideNav = () => {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: File,
            path: '/files'
        },


    ]

    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className='shadow-sm border-r h-full'>
            <div className="p-5 border-b">
                <img src="/logo.svg" width={100} height={100} />
            </div>
            <div className='flex flex-col float-left w-full'>
                {menuList.map((item, index) => (
                    <Link href={item.path} onClick={() => setActiveIndex(index)} className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${activeIndex === index ? 'bg-blue-50 text-primary' : null} `} key={item.id}>
                        <item.icon />
                        <h2>{item.name}</h2></Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav
