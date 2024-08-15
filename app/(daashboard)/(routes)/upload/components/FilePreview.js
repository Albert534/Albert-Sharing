import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const FilePreview = ({ file, removeFile }) => {
    return (
        <div className="flex items-center mt-5">
            <div className="border rounded-md p-2 border-blue-400 w-full font-bold relative">
                {/* Left Section - Image and Text */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12">
                            <Image src='/Image.jpg' layout="fill" alt="file" />
                        </div>
                        <div className='text-left font-bold'>
                            <h2>{file.name}</h2>
                            <h2 className='text-[12px] text-gray-400'>{file?.type} / {(file.size / 1024 / 1024).toFixed(2)}MB</h2>
                        </div>
                    </div>
                    {/* Right Section - Remove Button */}
                    <div className=" flex absolute top-5 right-2 justify-center">
                        <X className='text-red-500 cursor-pointer' onClick={() => removeFile()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilePreview;
