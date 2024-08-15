"use client";
import React, { useState } from 'react';
import { AlignJustify } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

const TopHeader = () => {
    const [show, setShow] = useState(false);

    const showButtons = () => {
        setShow(!show);

    };

    return (
         <div className='flex p-5 border-b items-center justify-between md:justify-end relative'>
            {show ? (
                <div className={'absolute top-0 left-0 bg-white w-40 px-4 py-2 border border-gray-200 rounded-md h-full flex flex-col justify-between'}>
                    <div>
                        <span>Albert Sharing</span>
                        <span className="text-sm">Hee hee</span>
                    </div>
                </div>
            ) : (
                <AlignJustify className="md:hidden cursor-pointer" onClick={showButtons} />
            )}
            <Image src='/logo.svg' width={150} height={100} className="md:hidden" />
            <UserButton />
        </div>
    );
};

export default TopHeader;