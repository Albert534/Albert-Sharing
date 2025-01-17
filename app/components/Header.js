import React from 'react';
import Logo from '../../public/logo.svg';
import Image from 'next/image';
const Header = () => {
    return (
        <div>
            <header className="bg-white">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b">
                    <Image src="./logo.svg" alt="Logo" width={100} height={100} className='ml-0' />

                    {/* Add this div to push the button to the right */}
                    <div className="flex-grow"></div>

                    <div className="flex items-center gap-4 ml-0">
                        <div className="sm:flex sm:gap-4">
                            <a
                                className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                href="/files"
                            >
                                Start Uploading Files
                            </a>
                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        </div>

    )
}

export default Header
