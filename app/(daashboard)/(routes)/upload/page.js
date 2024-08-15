"use client";

import React, { useEffect, useState } from 'react';
import UploadForm from './components/UploadForm';
import Notification from './components/Notification';
import Error from './components/Error';
import { app } from '../../../../firebaseconfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '../../../utils/GenerateRandomString';
import { useRouter } from 'next/navigation';

const Upload = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [showError, setShowError] = useState(false);
    const [progress, setProgress] = useState(0);
    const { user } = useUser();
    const storage = getStorage(app);
    const router = useRouter(); // Make sure this component is inside the pages directory
    const db = getFirestore(app);
    const [fileDocId, setFileDocId] = useState();

    const uploadFile = (file) => {
        const metadata = {
            contentType: file.type
        };
        const storageRef = ref(storage, 'music/' + file?.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
                if (progress === 100) {
                    setShowNotification(true);
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        saveInfo(file, downloadURL);

                    }).catch((error) => {
                        setShowError(true);
                        console.error('Error getting download URL:', error);
                    });
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error('Upload error:', error);
                setShowError(true);
            }
        );
    };

    const saveInfo = async (file, fileUrl) => {
        const docId = generateRandomString().toString();
        await setDoc(doc(db, "uploadedFile", docId), {
            fileName: file?.name,
            fileSize: file?.size,
            fileType: file?.type,
            fileUrl: fileUrl,
            userEmail: user?.primaryEmailAddress.emailAddress,
            userName: user?.fullName,
            id: docId,
            password: '',
            shortUrl: docId,

        });
        setFileDocId(docId);

        // Use router.push here after setting the fileDocId
        setTimeout(() => {
            router.push('/file-preview/' + docId);
        }, 3000);
    };

    return (
        <div className='p-5 px-8 md:px-28'>
            {showNotification && <Notification setShowNotification={setShowNotification} />}
            {showError && <Error />}
            <h2 className="text-[20px] text-center m-5 font-bold">Start <strong className='text-primary'>Uploading</strong> Your files and <span className="text-primary">Share</span> with your friends</h2>
            <UploadForm upload={(file) => uploadFile(file)} progress={progress} />
        </div>
    );
};

export default Upload;