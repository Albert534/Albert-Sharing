"use client";

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import app from "../../../../firebaseconfig";

const File = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const currentUser = user?.fullName;

    const fetchData = async () => {
        try {
            const db = getFirestore(app);
            const q = query(collection(db, "uploadedFile"), where("userName", "==", currentUser));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentUser]); // Fetch data when currentUser changes

    return (
        <>
            <p className="w-full mt-10 tracking-normal text-pretty text-2xl text-center md:text-left">
                This is the files and documents that you uploaded to the Albert sharing so far
                <span className="text-blue-500 font-bold block md:inline">
                    {currentUser}
                </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    userData.map((item, index) => {
                        // Calculate file size in MB
                        const fileSizeInBytes = item.fileSize;
                        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

                        return (
                            <div key={index} className='border p-10 mb-10 rounded-md mt-20 bg-gray-200'>
                                <h2 className="text-xl font-bold">{index + 1}. FileName: {item.fileName}</h2>
                                <a href={item.fileUrl} className='flex mt-3 text-black hover:text-blue-500'>Download Link:  {item.fileUrl}</a>
                                <div className='mt-3'>
                                    <p>File Size: {fileSizeInMB.toFixed(2)} MB</p>
                                    <p>File Type: {item.fileType}</p>
                                    {/* Render more fields as needed */}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default File;
