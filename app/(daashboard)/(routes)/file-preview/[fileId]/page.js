"use client";

import Link from "next/link";
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import app from '../../../../../firebaseconfig';
import { ArrowLeftSquare } from 'lucide-react';
import FileInfo from './components/FileInfo';
import FileShare from './components/FileShare';

const FilePreview = ({ params }) => {
    const db = getFirestore(app);
    const [file, setFile] = useState(null);

    useEffect(() => {
        console.log("params?.fileId:", params?.fileId);
        params?.fileId && getFileInfo();
    }, [params?.fileId]);

    const getFileInfo = async () => {
        try {
            const docRef = doc(db, "uploadedFile", params?.fileId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setFile(docSnap.data());
            } else {
                console.log("Document does not exist");
            }
        } catch (error) {
            console.error("Error fetching file info:", error);
        }
    };

    const onPasswordSave = async (password) => {
        try {
            const docRef = doc(db, "uploadedFile", params?.fileId);
            await updateDoc(docRef, { password });
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    return (
        <div className="py-10 px-20">
            <Link href='/upload' className='flex gap-3'><ArrowLeftSquare />Go To Upload</Link>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
                {file ? (
                    <>
                        <FileInfo file={file} />
                        <FileShare file={file} onPasswordSave={onPasswordSave} />
                    </>
                ) : (
                    <p>Loading file...</p>
                )}
            </div>
        </div>
    );
};

export default FilePreview;
