import Memo from "@/app/(models)/Memo.model";
import Transaction from '@/app/(models)/Transaction.model';
import Transaction_Backup from "@/app/(models)/TransactionBackup.model";
import { NextResponse } from "next/server";
import { generateMemoTN } from "@/app/(functions)/generateMemoTN.js";
import { cloudinaryUpload } from "@/app/(functions)/cloudinaryUpload.js";

export async function POST(req) {
    try {
        const data = await req.formData();  // EXTRACT ALL SUBMITTED MEMO DETAILS

        const title = data.get('title');
        const description = data.get('description');
        const sender = data.get('sender');
        const receipient = data.get('receipient');
        const id = data.get('id');
        const resent = Boolean(data.get('resent'));
        const type = data.get('type');

        const formDataEntryValues = Array.from(data.values());

        const memoData = {
            title,
            description,
            image: [],
        }

        if (!resent) {
            // CHECK FOR ALL REQUIRED FIELDS
            if (!memoData?.title || !memoData.description || !sender || !receipient) {
                return NextResponse.json(
                    { message: "All fields are required" },
                    { status: 400 }
                );
            }

            // CHECK THAT SENDER AND RECEIPIENT DON'T MATCH
            if (sender === receipient) {
                return NextResponse.json(
                    { message: "Sender cannot be the same as receipient" },
                    { status: 400 }
                );
            }

            // LOOP THROUGH ARRAY OF IMAGES AND SEND EACH IMAGE TO CLOUDINARY
            await Promise.all(formDataEntryValues.map(async (image) => {
                if (typeof image === "object") {
                    let url;
                    // UPLOAD FILE TO CLOUDINARY
                    try {
                        url = await cloudinaryUpload(image);
                    } catch (error) {
                        return NextResponse.json({ message: "Error", error }, { status: 500 });
                    }

                    memoData.image.push(url);
                }
            }));

            // GENERATE MEMO TRACKING NUMBER (MTN)
            const memoTrackingNum = generateMemoTN();
            const memoDataUpdated = {
                ...memoData,
                memoTrackingNum,
            } // UPDATE MEMO DETAILS WITH MTN


            // CREATE MEMO IN MEMO COLLECTION WITH MEMO DETAILS
            const createdMainMemo = await Memo.create(memoDataUpdated);

            // CREATE TRANSACTION DOCUMENT WITH MEMO DETAILS
            if (createdMainMemo) {
                const memoTransferDetails = {
                    sender,
                    receipient,
                    memoTrackingNum,
                    dateSent: Date.now(),
                };

                const savedMemoTransferDetails = await Transaction.create(memoTransferDetails); // CREATE NEW TRANSACTION
                const savedBackUpMemoTransferDetails = await Transaction_Backup.create({ ...memoTransferDetails, transactionId: savedMemoTransferDetails._id }); // CREATE NEW BACKUP TRANSACTION

                if (savedMemoTransferDetails && savedBackUpMemoTransferDetails) return NextResponse.json({ message: "Your memo has been sent" }, { status: 201 });
            }
        }
        else {  // IF MEMO IS RESENT OR FORWARDED
            if (sender === receipient) {
                return NextResponse.json(
                    { message: "Sender cannot be the same as receipient" },
                    { status: 400 }
                );
            }

            await Promise.all(formDataEntryValues.map(async (image) => {
                if (typeof image === "object") {
                    let url;
                    // UPLOAD FILE TO CLOUDINARY
                    try {
                        url = await cloudinaryUpload(image);
                    } catch (error) {
                        return NextResponse.json({ message: "Error", error }, { status: 500 });
                    }

                    memoData.image.push(url);
                }
            }));

            // SEARCH FOR TRANSACTION IN TRANSACTIONS COLLECTION
            const transDoc = await Transaction.findById(id);

            if (transDoc) { // IF TRANSACTION EXISTS
                await Memo.findOneAndUpdate({ memoTrackingNum: transDoc.memoTrackingNum }, { resent: resent, $push: { image: { $each: memoData.image } } }); // UPDATE MEMO IMAGES

                const resentDoc = { sender, receipient, memoTrackingNum: transDoc.memoTrackingNum, type }

                const resentMemo = await Transaction.create(resentDoc); // CREATE NEW TRANSACTION
                const backupResentMemo = await Transaction_Backup.create({ ...resentDoc, transactionId: resentMemo._id }); // CREATE NEW BACKUP TRANSACTION

                if (resentMemo && backupResentMemo) return NextResponse.json({ message: "Resent" }, { status: 201 });
            }// else... HANDLE NOT FOUND LATER
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function DELETE(req) {
    const body = await req.json();

    const deletedMemo = await Transaction.findByIdAndDelete(body);

    if (deletedMemo) return NextResponse.json({ message: "Memo has been deleted" }, { status: 201 });
}