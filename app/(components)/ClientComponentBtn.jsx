"use client";

import { useState, useRef } from "react";
import dynamic from 'next/dynamic';
import MemoPDFDocument from "@/app/(components)/MemoPDFDocument";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <span className='flex items-center text-center justify-center my-3'>
            <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            Loading
        </span>
    },
);

const ClientComponentBtn = ({ message, session }) => {
    const memoTransferHistory = message.memoTransferHistory;
    const formDataExtract = {
        ...message,
        memoTransferHistory,
    }

    const inputRef = useRef();

    // IMAGE SELECTION FUNCTIONALITY
    const handleClick = () => {
        inputRef.current.click();
    }

    const [previewImg, setPreviewImg] = useState([]);
    const [formData, setFormData] = useState(formDataExtract);
    const [memoStatus, setMemoStatus] = useState(null);
    const [resendMemoOpts, setResendMemoOpts] = useState(false);
    const [forwardMemoOpts, setForwardMemoOpts] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    const confirmReceipt = async (memoId) => {
        try {
            const res = await fetch("http://localhost:3000/api/Memos/confirmMemos", {
                method: "POST",
                body: JSON.stringify({ memoId }),
                "content-type": "application/json"
            });

            const decRes = await res.json();

            if (res.ok) {
                toast.success(decRes.message, { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
                setMemoStatus(decRes.message);
                setLoadingAction(false);
            }

            return decRes;
        } catch (err) {
            toast.error('An error occured in confirming the memo. Check your internet connection and try again', { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
            setLoadingAction(false);
        }
    }

    const forwardMemo = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        if (formData.sender === session.user.office) { // SKIP CONFIRMATION HERE - CURRENT SENDER IS SAME AS ORIGINAL SENDER, HENCE A 'RESEND'
            formData.resent = true;
            formData.type = "resend";

            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);
            formDataToSend.append('sender', formData.sender);
            formDataToSend.append('receipient', formData.receipient);
            formDataToSend.append('resent', formData.resent);
            formDataToSend.append('id', formData.id);
            formDataToSend.append('type', formData.type);

            if (formData.images?.length > 0) {
                Array.from(formData.images).map(image => {
                    formDataToSend.append(image.name, image);
                })
            }
        } else { // DO CONFIRMATION HERE - CURRENT SENDER IS NOT SAME AS ORIGINAL SENDER, HENCE A 'FORWARD'
            // confirmMsg = await confirmReceipt(formData.id);

            // if (confirmMsg) {
            formData.sender = session.user.office;
            formData.resent = true;
            formData.type = "forward";

            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);
            formDataToSend.append('sender', formData.sender);
            formDataToSend.append('receipient', formData.receipient);
            formDataToSend.append('resent', formData.resent);
            formDataToSend.append('id', formData.id);
            formDataToSend.append('type', formData.type);
            // }

            if (formData.images?.length > 0) {
                Array.from(formData.images).map((image, index) => {
                    formDataToSend.append(image.name, image);
                })
            }
        }

        const res = await fetch("/api/Memos", {
            method: "POST",
            body: formDataToSend,
        });

        const decRes = await res.json();

        if (res.ok) {
            toast.success(decRes.message, { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
            setPreviewImg([]);
            setLoadingAction(false);
        } else {
            toast.error(decRes.message, { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
            setLoadingAction(false);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files),
        });

        const imageURLArray = [];
        Array.from(e.target.files).map((_file, index) => {
            imageURLArray.push(URL.createObjectURL(e.target.files[index]));
        })

        setPreviewImg(imageURLArray);
    };

    return (
        <>
            <div className="mt-5 flex flex-col items-start justify-between">
                {
                    formData.sender !== session.user.office
                        ? !formData.dateConfirmed
                            ? <button className="p-3 bg-orange-500 border border-black hover:bg-orange-600 text-white rounded active:scale-95 transition-all" onClick={() => {
                                confirmReceipt(formData.id);
                                setLoadingAction(true);
                            }} >
                                {loadingAction ?
                                    (
                                        <span className='flex items-center text-center justify-center'>
                                            <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            Confirming
                                        </span>
                                    ) : <>Confirm Memo</>}
                            </button>
                            : <p className='font-bold'>Memo has been confirmed</p>
                        : <></>
                }

                <PDFDownloadLink document={<MemoPDFDocument message={message} />} fileName='memoDetails.pdf' className='rounded p-3 my-3 bg-orange-500 border border-black hover:bg-orange-600 text-white active:scale-95 transition-all'>
                    <p>Download Memo as PDF</p>
                </PDFDownloadLink>

                {
                    formData.sender !== session.user.office // sender of memo is not the same as logged in user 
                        ?
                        <button className="p-3 bg-orange-500 border border-black hover:bg-orange-600 text-white rounded active:scale-95 transition-all" onClick={() => {
                            setForwardMemoOpts(true);
                        }} >
                            Forward Memo
                        </button>
                        : <button className="p-3 bg-orange-500 border border-black hover:bg-orange-600 text-white rounded active:scale-95 transition-all" onClick={() => {
                            setResendMemoOpts(true);
                        }} >
                            Resend Memo
                        </button>
                }
            </div>

            {
                resendMemoOpts
                    ? <form onSubmit={forwardMemo} className="mt-5">
                        <div>
                            <label htmlFor="receipient" className='font-bold'>Resend to:</label> <br />
                            <select name='receipient' onChange={handleChange} className="mb-3 bg-slate-300 border border-black p-2 rounded" value={formData.receipient}>
                                <option value=''></option>
                                <option value="office a">Office A</option>
                                <option value="office b">Office B</option>
                                <option value="office c">Office C</option>
                                <option value="office d">Office D</option>
                                <option value="office e">Office E</option>
                            </select>
                        </div>
                        <div className="my-5"></div>
                        <div>
                            <label htmlFor="attach-images" className="font-bold">Attach Images:</label> <br />
                            <input type="file" name="image" id="image" className="border hidden border-black w-full focus:!outline-none bg-slate-300 rounded p-2" ref={inputRef} multiple accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                                {
                                    previewImg.length < 1
                                        ? ''
                                        :
                                        previewImg.map((img, index) => (
                                            <Link key={index} href={img} target="_blank" className='relative inline-block rounded h-[100px] border-black border overflow-hidden'>
                                                <Image alt="" src={img} style={{ objectFit: "cover" }} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                            </Link>
                                        ))
                                }
                                <div className='h-[100px] bg-black/50 rounded cursor-pointer border border-black flex items-center justify-center' onClick={handleClick}>
                                    <span className="text-white text-4xl">+</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-6"></div>
                        <button type="submit" className='bg-orange-500 border border-black text-white p-3 rounded cursor-pointer active:scale-95 transition-all' onClick={() => { setLoadingAction(true) }}>
                            {loadingAction ?
                                (
                                    <span className='flex items-center text-center justify-center'>
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        Resending
                                    </span>
                                ) : <>Resend Memo</>}
                        </button>
                    </form>
                    : <></>
            }

            {
                forwardMemoOpts
                    ? <form onSubmit={forwardMemo} className="mt-5">
                        <div>
                            <label htmlFor="receipient" className='font-bold'>Forward to:</label> <br />
                            <select name='receipient' onChange={handleChange} className="mb-3 bg-slate-300 p-2 rounded" value={formData.receipient}>
                                <option value=''></option>
                                <option value="office a">Office A</option>
                                <option value="office b">Office B</option>
                                <option value="office c">Office C</option>
                                <option value="office d">Office D</option>
                                <option value="office e">Office E</option>
                            </select>
                        </div>
                        <div className="my-5"></div>
                        <div>
                            <label htmlFor="attach-images" className="font-bold">Attach Images:</label> <br />
                            <input type="file" name="image" id="image" className="border hidden border-black w-full focus:!outline-none bg-slate-300 rounded p-2" ref={inputRef} multiple accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                                {
                                    previewImg.length < 1
                                        ? ''
                                        :
                                        previewImg.map((img, index) => (
                                            <Link key={index} href={img} target="_blank" className='relative inline-block rounded h-[100px] border-black border overflow-hidden'>
                                                <Image alt="" src={img} style={{ objectFit: "cover" }} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                            </Link>
                                        ))
                                }
                                <div className='h-[100px] bg-black/50 rounded cursor-pointer border border-black flex items-center justify-center' onClick={handleClick}>
                                    <span className="text-white text-4xl">+</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-6"></div>
                        <button type="submit" className='bg-orange-500 border border-black text-white p-3 rounded cursor-pointer active:scale-95 transition-all' onClick={() => { setLoadingAction(true) }}>
                            {loadingAction ?
                                (
                                    <span className='flex items-center text-center justify-center'>
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        Forwarding
                                    </span>
                                ) : <>Forward Memo</>}
                        </button>
                    </form>
                    : <></>
            }
        </>
    )
}

export default ClientComponentBtn