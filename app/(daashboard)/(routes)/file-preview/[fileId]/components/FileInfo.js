import React, { useEffect, useState } from 'react';

const FileInfo = ({ file }) => {
    const [fileType, setFileType] = useState("");
    const [fileSizeInMB, setFileSizeInMB] = useState(0);

    useEffect(() => {
        if (file) {
            setFileType(file.fileType.split('/')[0]);
            const fileSizeInMB = file.fileSize ? (file.fileSize / (1024 * 1024)) : 0;
            setFileSizeInMB(fileSizeInMB);
        }
    }, [file])

    return file && (
        <div className="text-center border flex justify-center m-4 flex-col items-center p-2 rounded-md border-blue-200">
            <img src={fileType === 'image' ? file?.fileUrl : 'file.png'} width={200} height={200} className='h-[200px] rounded-md object-contain' alt='The file is not an image file so there is no image for the preview.' />
            <div className=''>
                <h2>{file.fileName}</h2>
                <h2 className='text-gray-400 text-[13px]'>{fileSizeInMB.toFixed(2)} MB</h2>
            </div>
        </div>
    )
}

export default FileInfo;
