import React from 'react';
import { useState } from 'react';
import { Copy } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import emailjs from 'emailjs-com';

const FileShare = ({ file, onPasswordSave }) => {
    const [isPasswordEnable, setIsEnablePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const user = useUser();

    const handleCopyClick = () => {
        navigator.clipboard.writeText(`http://localhost:3000/${file.shortUrl}`)
            .then(() => setIsCopied(true))
            .catch(error => console.error('Error copying text: ', error));
    };
    console.log(file)

    const sendEmail = () => {
        // Check if email is empty or invalid format
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError(true);
            return;
        }

        // Create template parameters for the email
        const templateParams = {
            to_email: email,
            from_name: file.userEmail, // Use userEmail as the sender's name
            message: `You have received a file from ${file.userName}. 
        File Name: ${file.fileName}
        File Size: ${file.fileSize}
        File Type: ${file.fileType}
        Download Link: ${file.fileUrl}`,
            reply_to: file.userEmail, // Set reply-to address to user's email
            button: `<div className='text-white bg-green-500 rounded-md border'>Click here to download</div>`
        };

        // Send email using emailjs
        emailjs.send(
            process.env.NEXT_PUBLIC_SERVICE_ID ?? "",
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID ?? ""
        ).then((response) => {
            console.log('Email sent successfully:', response);
            setSuccess(true);
        }).catch((error) => {
            console.error('Error sending email:', error);
            setError(true); // Set error state to true for user feedback
        });
        setError(false);
    };

    return file && (
        <>
            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-[14px] text-gray-500'>Short Url</label>
                </div>
                <div className='flex gap-5 p-2 border rounded-md justify-normal w-full'>
                    <input
                        id="urlInput"
                        type="text"
                        value={`http://localhost:3000/${file.shortUrl}`}
                        disabled
                        className='disabled:text-gray-500 bg-transparent outline-none flex-grow'
                    />
                    <Copy
                        onClick={handleCopyClick}
                        className={`text-gray-400 hover:text-gray-600  ${isCopied ? 'text-blue-700' : ''}`}
                    />
                </div>
                <div className='gap-3 flex mt-5'>
                    <input type='checkbox' onChange={(e) => setIsEnablePassword(!isPasswordEnable)} checked={isPasswordEnable}></input>
                    <label>Enable Password?</label>
                </div>
                {
                    isPasswordEnable ? <div className='flex gap-3 items-center'>
                        <div className='border rounded-md w-full p-2'>
                            <input type='password' className='disabled:text-gray-500 bg-transparent outline-none' onChange={(e) => setPassword(e.target.value)} /></div>

                        <button className='p-2 bg-primarytext-white rounded-md disabled:bg-gray-300 hover:bg-blue-600 disabled:bg-gray-500' disabled={password?.length < 3 || password?.length === 0} onClick={() => onPasswordSave(password)}>Save</button>
                    </div> : null
                }

                <div className='flex flex-col gap-2 mt-10 border rounded-md py-4 px-3'>
                    <div><label className='text-[14px] text-gray-500'>Email to Send the File</label></div>
                    <div className='border rounded-md w-full p-2'><input type='email' className='disabled:text-gray-500 bg-transparent outline-none' placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}></input></div>
                    <div><button className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700' onClick={() => sendEmail()}>Send Email</button></div>
                </div>
                {error ? <p className='text-red-500'>Please Enter The valid format of an Email</p> : null}
                {
                    success && (
                        <p className='text-green-500'>
                            The file is successfully sent to {email}
                        </p>
                    )
                }
            </div>
        </>
    );
};

export default FileShare;
